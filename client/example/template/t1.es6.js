var grid;

Template.t1.onRendered(function () {
    this.$('#holder1').w2grid({
        w2uimeteorCollection: W2UI_METEOR.Employees,
        name: 'myGrid1',
        show: {
            toolbar: true,
            footer: true,
            toolbarAdd: W2UI_METEOR.PermissionsClientHelper.isAdd(),
            toolbarDelete: W2UI_METEOR.PermissionsClientHelper.isDelete(),
            //toolbarSave: W2UI_METEOR.PermissionsClientHelper.isSave(),  todo: BROKEN https://github.com/vitmalina/w2ui/issues/842
            selectColumn: true
        },
        multiSearch: false,
        multiSelect: true, // default
        reorderColumns: false,
        columns: [
            {field: 'recid', caption: 'ID', size: '150px', attr: 'align=left', hidden: true},
            {field: 'firstName', caption: 'First Name', size: '100px', resizable: true, searchable: true, editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {type: 'text'} : null), sortable: true},
            {field: 'lastName', caption: 'Last Name', size: '100px', resizable: true, searchable: true, editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {type: 'text'} : null), sortable: true},
            {field: 'badgeNumber', caption: 'Badge #', size: '100px', resizable: true, searchable: true, sortable: true,
                editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {
                        type: 'int',
                        min: W2UI_METEOR.Schemas.Employee._schema.badgeNumber.min
                    } : null)
            },
            {field: 'favoriteColor', caption: 'Favorite Color', size: '100px', resizable: true, searchable: true, editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {type: 'color'} : null), sortable: true},
            {field: 'tag', caption: 'Tag', size: '200px', sortable: true, searchable: true,
                // todo: sorting is broken here, See http://w2ui.com/web/docs/w2grid.sort.  Could be: http://stackoverflow.com/questions/18552146/sort-grid-with-json-content
                render: function(record) {
                    var backgroundColor = record.favoriteColor;
                    return   "<div style='font-weight:bold; background-color: #" + backgroundColor + "'>" + record.tag() + "</div>";
                }
            },
            {field: 'iq', caption: 'IQ', size: '50px', resizable: true, searchable: true, sortable: true,
                editable: (W2UI_METEOR.PermissionsClientHelper.isEdit() ? {
                    type: 'int',
                    min: W2UI_METEOR.Schemas.Employee._schema.iq.min - 10 // test for schema validation
                } : null)
            },
            {field: 'creationTimeStamp', caption: 'Creation timestamp', size: '30%', resizable: true, searchable: true, sortable: true}
        ],
        toolbar: { // http://w2ui.com/web/demos/#!grid/grid-21
            items: W2UI_METEOR.PermissionsClientHelper.toolbarItemRequest(['save','exportToPdf','exportToExcel']),
            onClick: function (event) {
                if (event.target == 'save') {
                    W2UI_METEOR.ClientHelper.multiRecordSaveForGrid(grid, event);
                }
                if (event.target == 'exportToPdf') {
                    w2alert('exportToPdf');
                }
                if (event.target == 'exportToExcel') {
                    w2alert('exportToExcel');
                }
            }
        },
        onAdd: function (event) {
            W2UI_METEOR.ClientHelper.addForGrid(grid, event);
        },
        onChange: function (event) {
            if (W2UI_METEOR.PermissionsClientHelper.isSave()) grid['toolbar'].enable('save');
        },
        onDelete: function (event) {
            W2UI_METEOR.ClientHelper.multiRecordDeleteForGrid(grid, event);
        }
    });

    grid = w2ui['myGrid1'];
    grid.recid = "_id";

    this.autorun(function() {
        grid.reload();
    });
});

Template.t1.onDestroyed(function () {
    grid.destroy();
});