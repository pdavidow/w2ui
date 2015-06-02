W2UI_METEOR.LocalRecidService = (function() {
    _localRecid = function() {
        return this.__localRecid = this.__localRecid || 0;
    };
    _incrementLocalRecid = function() {
        this.__localRecid = _localRecid() + 1;
    };
    _nextLocalRecid = function() {
        _incrementLocalRecid();
        return _localRecid();
    };
    _isLocalRecid = function(recid) {
        // Mongo has (hex) strings
        return _.isNumber(recid);
    };
    _isNonLocalRecid = function(recid) {
        return ! _isLocalRecid(recid);
    };
    _nonLocalRecidSubset = function(recids) {
        return _.filter(recids, function(recid){return _isNonLocalRecid(recid)});
    };

    return {
        nextLocalRecid: _nextLocalRecid,
        isLocalRecid: _isLocalRecid,
        nonLocalRecidSubset: _nonLocalRecidSubset
    }
})();
