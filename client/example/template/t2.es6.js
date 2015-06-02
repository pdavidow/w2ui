var grid;
var currentRecid = null;

Template.t2.onRendered(function () {
    this.$('#holder2').w2grid({
        w2uimeteorCollection: W2UI_METEOR.Employees,
        name: 'myGrid2',
        show: {
            toolbar: false
        },
        columns: [
            {field: 'recid', caption: 'ID', size: '150px', sortable: true, attr: 'align=left', hidden: true},
            {field: 'firstName', caption: 'First Name', size: '100px', resizable: true, editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {type: 'text'} : null), sortable: true},
            {field: 'lastName', caption: 'Last Name', size: '100px', resizable: true, editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {type: 'text'} : null), sortable: true},
            {field: 'badgeNumber', caption: 'Badge #', size: '100px', resizable: true, sortable: true,
                editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {
                    type: 'int',
                    min: W2UI_METEOR.Schemas.Employee._schema.badgeNumber.min
                } : null)
            },
            {field: 'favoriteColor', caption: 'Favorite Color', size: '100px', resizable: true, editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {type: 'color'} : null), sortable: true},
            {field: 'iq', caption: 'IQ', size: '50px', resizable: true, sortable: true,
                editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {
                    type: 'int',
                    min: W2UI_METEOR.Schemas.Employee._schema.iq.min - 10 // test for schema validation
                } : null)
            },
            {field: 'edit', caption: '', size: '250px',
                render: function(record) { // http://demos.telerik.com/kendo-ui/grid/editing-inline
                    return W2UI_METEOR.ClientHelper.singleRecordOperationButtonString();
                }
            }
        ],
        onClick: function(target, eventData) {
            var oldRecid = currentRecid;
            currentRecid = eventData.recid;
            if (oldRecid != currentRecid) grid.reload();
        },
        onDblClick: function(event) {
            event.preventDefault();
        },
        onReload: function(event) {
        }
    });

    grid = w2ui['myGrid2'];
    grid.recid = "_id";

    this.autorun(function() {
        grid.reload();
    });
});

Template.t2.events({
    "click #inline-edit": function(event) {
        W2UI_METEOR.ClientHelper.singleRecordEnableEditForGrid(currentRecid, grid, event);
    },
    "click #inline-delete": function(event) {
        W2UI_METEOR.ClientHelper.singleRecordDeleteForGrid(currentRecid, grid, event);
    },
    "click #inline-save": function(event) {
        W2UI_METEOR.ClientHelper.singleRecordSaveForGrid(currentRecid, grid, event);
    },
    "click #inline-cancel": function(event) {
        grid.reload();
    }
});

Template.t2.onDestroyed(function() {
    grid.destroy();
});
