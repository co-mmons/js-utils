"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var json_1 = require("../json");
var IntlValue;
(function (IntlValue) {
    function value(value, locale) {
        if (value) {
            return value[locale];
        }
        return undefined;
    }
    IntlValue.value = value;
    function clone(value) {
        if (!value) {
            return value;
        }
        var niu = {};
        for (var i in value) {
            niu[i] = value[i];
        }
        return niu;
    }
    IntlValue.clone = clone;
})(IntlValue = exports.IntlValue || (exports.IntlValue = {}));
var IntlValueSerializer = (function (_super) {
    __extends(IntlValueSerializer, _super);
    function IntlValueSerializer(valueType) {
        _super.call(this, valueType);
    }
    return IntlValueSerializer;
}(json_1.ObjectAsMapSerializer));
exports.IntlValueSerializer = IntlValueSerializer;
//# sourceMappingURL=value.js.map