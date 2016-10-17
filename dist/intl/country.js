export var Country = (function () {
    function Country(codeOrPrototype) {
        if (typeof codeOrPrototype === 'string') {
            this._code = codeOrPrototype;
        }
        else if (codeOrPrototype['code'] && typeof codeOrPrototype['code'] === 'string') {
            this._code = codeOrPrototype['code'];
        }
        else {
            throw 'Country code must be given in order to create Country instance';
        }
    }
    Object.defineProperty(Country.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Country.prototype.toString = function () {
        return this._code;
    };
    Country.prototype.toJSON = function () {
        return this._code;
    };
    Country.prototype.fromJSON = function (json) {
        if (typeof json === 'string') {
            this._code = json;
        }
        else if (json && typeof json['code'] === 'string') {
            this._code = json['code'];
        }
        else {
            throw 'Cannot unserialize "' + json + '" to Country instance';
        }
    };
    return Country;
}());
//# sourceMappingURL=country.js.map