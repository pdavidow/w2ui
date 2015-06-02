// colors.js would be nice, but it currently only runs on client

W2UI_METEOR.ColorHelper = (function() {
    _randomColorHexStringWithoutHashSign = function() {
        //http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
        return ((1<<24)*(Math.random()+1)|0).toString(16).substr(1);
    };
    _randomColorHexString = function() {
        return '#' + _randomColorHexStringWithoutHashSign();
    };

    return {
        randomColorHexStringWithoutHashSign: _randomColorHexStringWithoutHashSign,
        randomColorHexString: _randomColorHexString
    }
})();
