W2UI_METEOR.ClientHelper = (function() {
    _singleRecordValidateChanges = function(changesWithRecid, grid, context) {
        var recid;
        var validationObject;
        var invalidKeys;
        var errorMessage;
        var currentSelection;

        validationObject = _objectOfInterest(grid, changesWithRecid);
        context.validate(validationObject);

        if (! context.isValid()) {
            errorMessage = "";
            currentSelection = grid.getSelection();
            _.each(currentSelection, function(unselectRecid) {
                grid.unselect(unselectRecid);
            });
            recid = changesWithRecid.recid;
            grid.select(recid);
            invalidKeys = context.invalidKeys();
            _.each(invalidKeys, function(errorInfo) {
                errorMessage += (context.keyErrorMessage(errorInfo.name) + "<br>");
            });
            grid.error(errorMessage);
            return false;
        };
        return true;
    };

    _singleRecordApplyChanges = function(changesWithRecid, grid) {
        var currentChanges = _.omit(changesWithRecid, "recid");
        var recid = changesWithRecid.recid;
        var klass = grid.w2uimeteorCollection.w2uimeteorClass;
        var manager = klass.manager();
        var insertionObject;

        if (_isInsertRecord(recid)) {
            insertionObject = _objectOfInterest(grid, changesWithRecid);
            manager.insert(insertionObject, function(error, result) {
                if (error) {
                    w2alert(error.message)
                } else if (result) {
                    grid.refresh(result);
                }
            });
        } else {
            manager.update(recid, currentChanges, function (error, result) {
                if (error) w2alert(error.message);
            });
        }
    };

    _objectOfInterest = function(grid, singleRecordChangesWithRecid) {
        var recid;
        var changes;
        var currentRecordIndex;
        var currentRecord;
        var klass;
        var schemaKeys;
        var baseObject;

        recid = singleRecordChangesWithRecid.recid;
        changes = _.omit(singleRecordChangesWithRecid, "recid");
        currentRecordIndex = grid.find({recid: recid}, true);
        currentRecord = grid.records[currentRecordIndex];
        klass = grid.w2uimeteorCollection.w2uimeteorClass;
        schemaKeys = klass.schema()._schemaKeys;
        baseObject = _.pick(currentRecord, schemaKeys);
        return _.extend(baseObject, changes);
    };

    _isInsertRecord = function(recid) {
        return W2UI_METEOR.LocalRecidService.isLocalRecid(recid);
    };

    _isUpdateRecord = function(recid) {
        return ! _isInsertRecord(recid);
    };

    _addForGrid = function(grid, event) {
        var klass;
        var instance;
        var instanceWithLocalRecid;

        if (! W2UI_METEOR.PermissionsClientHelper.isAdd()) return;

        klass = grid.w2uimeteorCollection.w2uimeteorClass;
        instance = klass.default();
        instanceWithLocalRecid = _.extend(instance, {recid: W2UI_METEOR.LocalRecidService.nextLocalRecid(), changes: _.clone(instance)});
        grid.add(instanceWithLocalRecid);
        if (W2UI_METEOR.PermissionsClientHelper.isSave()) grid['toolbar'].enable('save');
    };

    _singleRecordDeleteForGrid = function(recid, grid, event) {
        if (! W2UI_METEOR.PermissionsClientHelper.isDelete()) return;
        check(recid, String);

        w2confirm("Are you sure?").yes(function() {
            var klass;
            var manager;

            klass = grid.w2uimeteorCollection.w2uimeteorClass;
            manager = klass.manager();
            manager.remove([recid], function (error, result) {
                if (error) w2alert(error.message);
            });
        })
    };

    _multiRecordDeleteForGrid = function(grid, event) {
        var prefix;
        var changes;
        if (! W2UI_METEOR.PermissionsClientHelper.isDelete()) return;

        prefix = "";
        changes = grid.getChanges();
        if (changes.length > 0) prefix = "All pending changes will be lost if you proceed. "
        w2confirm(prefix + "Are you sure?").yes(function() {
            var recids = grid.getSelection();
            var ids = W2UI_METEOR.LocalRecidService.nonLocalRecidSubset(recids);
            var klass;
            var manager;

            if (_.isEmpty(ids)) return grid.reload(); // remove pending added

            klass = grid.w2uimeteorCollection.w2uimeteorClass;
            manager = klass.manager();
            manager.remove(ids, function (error, result) {
                if (error) w2alert(error.message);
            });
        })
    };

    _singleRecordSaveForGrid = function(currentRecid, grid, event) {
        var isError;
        var singleRecordChangesWithRecid;

        findSingleRecordChangesWithRecid = function() {
            var multiRecordChangesWithRecid;
            var recidOfInterest;

            multiRecordChangesWithRecid = grid.getChanges();
            if (_.isEmpty(multiRecordChangesWithRecid)) return null; // no changes
            if (_.size(multiRecordChangesWithRecid) > 1) throw new Meteor.Error("Must edit one record at a time"); // should never be the case
            singleRecordChangesWithRecid = _.first(multiRecordChangesWithRecid);
            recidOfInterest = singleRecordChangesWithRecid.recid;
            if (currentRecid != recidOfInterest) throw new Meteor.Error("Invalid record"); // should never be the case
            return singleRecordChangesWithRecid;
        };
        validateChanges = function() {
            var klass = grid.w2uimeteorCollection.w2uimeteorClass;
            var context = klass.defaultSchemaContext();
            isError = ! _singleRecordValidateChanges(singleRecordChangesWithRecid, grid, context);
        };
        applyChanges = function() {
            _singleRecordApplyChanges(singleRecordChangesWithRecid, grid);
        };
        emptyChanges = function() {
            grid.save();
        };

        if (! W2UI_METEOR.PermissionsClientHelper.isSave()) return;

        singleRecordChangesWithRecid = findSingleRecordChangesWithRecid();
        isError = false;
        validateChanges();
        if (isError) return;
        applyChanges();
        emptyChanges();
    };

    _multiRecordSaveForGrid = function(grid, event) {
        var isError;
        var multiRecordChangesWithRecid;

        validateChanges = function() {
            var klass = grid.w2uimeteorCollection.w2uimeteorClass;
            var context = klass.defaultSchemaContext();

            _.each(multiRecordChangesWithRecid, function(each){
                if (isError) return; // stop on first recid that has problem
                isError = ! _singleRecordValidateChanges(each, grid, context);
            });
        };
        applyChanges = function() {
            _.each(multiRecordChangesWithRecid, function(each){
                _singleRecordApplyChanges(each, grid);
            });
        };
        emptyChanges = function() {
            grid.save();
        };

        if (! W2UI_METEOR.PermissionsClientHelper.isSave()) return;

        multiRecordChangesWithRecid = grid.getChanges();
        if (_.isEmpty(multiRecordChangesWithRecid)) return;

        isError = false;
        validateChanges();
        if (isError) return;
        applyChanges();
        emptyChanges();
        grid['toolbar'].disable('save');
    };

    _singleRecordEnableEditForGrid = function(currentRecid, grid, event) {
        var columnCount;

        columnCount = grid.columns.length;
        _.each(_.range(columnCount), function(index){
            grid.editField(currentRecid, index);
        });
    };

    _singleRecordOperationButtonString = function() {
        return '<a id="inline-edit" class="k-button k-button-icontext k-grid-edit" href="#"><span class="k-icon k-edit"></span>Edit  </a> ' +
            '<a id="inline-delete" class="k-button k-button-icontext k-grid-delete" href="#"><span class="k-icon k-delete"></span>Delete</a>' +
            '<a id="inline-save" class="k-button k-button-icontext k-primary k-grid-update" href="#"><span class="k-icon k-update"></span>Save  </a> ' +
            '<a id="inline-cancel" class="k-button k-button-icontext k-grid-cancel" href="#"><span class="k-icon k-cancel"></span>Cancel</a>';
    };

    return {
        addForGrid: _addForGrid,
        singleRecordDeleteForGrid: _singleRecordDeleteForGrid,
        multiRecordDeleteForGrid: _multiRecordDeleteForGrid,
        singleRecordSaveForGrid: _singleRecordSaveForGrid,
        multiRecordSaveForGrid: _multiRecordSaveForGrid,
        singleRecordEnableEditForGrid: _singleRecordEnableEditForGrid,
        singleRecordOperationButtonString: _singleRecordOperationButtonString
    }
})();
