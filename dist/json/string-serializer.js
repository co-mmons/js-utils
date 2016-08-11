"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var index_1 = require("./index");
var StringSerializer = (function (_super) {
    __extends(StringSerializer, _super);
    function StringSerializer() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(StringSerializer, "INSTANCE", {
        get: function () {
            return DEFAULT_INSTANCE;
        },
        enumerable: true,
        configurable: true
    });
    StringSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "string") {
            return value;
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as string";
        }
        else {
            return undefined;
        }
    };
    StringSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "string") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return value + "";
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to string.";
        }
        else {
            return undefined;
        }
    };
    return StringSerializer;
}(index_1.Serializer));
exports.StringSerializer = StringSerializer;
var DEFAULT_INSTANCE = new StringSerializer();
//# sourceMappingURL=string-serializer.js.map