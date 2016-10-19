export var Currency = (function () {
    function Currency(codeOrPrototype) {
        if (typeof codeOrPrototype === 'string') {
            this._code = codeOrPrototype;
        }
        else if (codeOrPrototype['code'] && typeof codeOrPrototype['code'] === 'string') {
            this._code = codeOrPrototype['code'];
        }
        else {
            throw 'Currency code must be given in order to create Currency instance';
        }
    }
    Object.defineProperty(Currency.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Currency.prototype.toString = function () {
        return this._code;
    };
    Currency.prototype.toJSON = function () {
        return this._code;
    };
    Currency.prototype.fromJSON = function (json) {
        if (typeof json === 'string') {
            this._code = json;
        }
        else if (json && typeof json['code'] === 'string') {
            this._code = json['code'];
        }
        else {
            throw 'Cannot unserialize "' + json + '" to Currency instance';
        }
    };
    return Currency;
}());
//# sourceMappingURL=currency.js.map