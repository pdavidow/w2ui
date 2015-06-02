W2UI_METEOR.PermissionsClientHelper = (function() {
    _toolbarItemRequest = function(itemIds) {
        var result = [];
        _.each(itemIds, function(id) {
            if ((id == 'add') && (_isAdd())) {
                result.push({id: id, type: 'button', caption: 'Add', icon: 'w2ui-icon-plus'});
            };
            if ((id == 'delete') && (_isDelete())) {
                result.push({id: id, type: 'button', caption: 'Delete', icon: 'w2ui-icon-cross'});
            };
            if ((id == 'save') && (_isSave())) {
                result.push({id: id, type: 'button', caption: 'Save', icon: 'w2ui-icon-check', disabled: true});
            };
            if ((id == 'exportToPdf') && (_isExport())) {
                result.push({id: id, type: 'button', caption: 'PDF'});
            };
            if ((id == 'exportToExcel') && (_isExport())) {
                result.push({id: id, type: 'button', caption: 'Excel'});
            };
        });
        return result;
    };
    _isAdd = function() {
        return W2UI_METEOR.PermissionsHelper.isAllowMethodInsert();
    };
    _isEdit = function() {
        return W2UI_METEOR.PermissionsHelper.isAllowMethodUpdate();
    };
    _isSave = function() {
        return _isEdit();
    };
    _isDelete = function() {
        return W2UI_METEOR.PermissionsHelper.isAllowMethodRemove();
    };
    _isExport = function() {
        return W2UI_METEOR.PermissionsHelper.isExport();
    };

    return {
        isAdd: _isAdd,
        isEdit: _isEdit,
        isSave: _isSave,
        isDelete: _isDelete,
        isExport: _isExport,
        toolbarItemRequest: _toolbarItemRequest
    }
})();
