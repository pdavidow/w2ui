W2UI_METEOR.PermissionsHelper = (function() {
    _isExport = function() {
        return true;
    };
    _isAllowMethodInsert = function() {
        return true;
    };
    _isAllowMethodUpdate = function() {
        return true;
    };
    _isAllowMethodRemove = function() {
        return true;
    };

    return {
        isExport: _isExport,
        isAllowMethodInsert: _isAllowMethodInsert,
        isAllowMethodUpdate: _isAllowMethodUpdate,
        isAllowMethodRemove: _isAllowMethodRemove
    }
})();
