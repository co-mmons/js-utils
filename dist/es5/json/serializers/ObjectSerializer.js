"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
var tslib_1 = require("tslib");
var findTypeOrSerializerByName_1 = require("../findTypeOrSerializerByName");
var findTypeSerializer_1 = require("../findTypeSerializer");
var identifyType_1 = require("../identifyType");
var Serializer_1 = require("../Serializer");
var ObjectSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectSerializer, _super);
    function ObjectSerializer(type) {
        var _this = _super.call(this) || this;
        if (type && type !== Object) {
            _this.type = type;
        }
        return _this;
    }
    ObjectSerializer.prototype.serialize = function (object, options) {
        if (this.isUndefinedOrNull(object)) {
            return object;
        }
        else {
            var serializer = findTypeSerializer_1.findTypeSerializer(this.type ? this.type : identifyType_1.identifyType(object), options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer && serializer !== this) {
                return serializer.serialize(object, options);
            }
            if (object.toJSON) {
                return object.toJSON();
            }
        }
        return object;
    };
    ObjectSerializer.prototype.unserialize = function (json, options) {
        var e_1, _a;
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        if (this.type) {
            var serializer = findTypeSerializer_1.findTypeSerializer(this.type, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (serializer) {
                return serializer.unserialize(json, options);
            }
            else {
                return this.unserializeToType(this.type, json);
            }
        }
        if (!this.type && (typeof json !== "object" || Array.isArray(json))) {
            var type = identifyType_1.identifyType(json);
            if (type !== Object) {
                var serializer = findTypeSerializer_1.findTypeSerializer(type, options === null || options === void 0 ? void 0 : options.typeProviders);
                if (serializer) {
                    return serializer.unserialize(json, options);
                }
                else {
                    return json;
                }
            }
            else {
                return json;
            }
        }
        else {
            var typeOrSerializer = findTypeOrSerializerByName_1.findTypeOrSerializerByName(json, options === null || options === void 0 ? void 0 : options.typeProviders);
            if (typeOrSerializer instanceof Serializer_1.Serializer) {
                return typeOrSerializer.unserialize(json, options);
            }
            else if (typeOrSerializer) {
                return this.unserializeToType(typeOrSerializer, json);
            }
            var niu = {};
            try {
                for (var _b = tslib_1.__values(Object.keys(json)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var property = _c.value;
                    niu[property] = this.unserialize(json[property], options);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return niu;
        }
    };
    ObjectSerializer.prototype.unserializeToType = function (type, json) {
        if (type.prototype["fromJSON"]) {
            var instance = Object.create(type.prototype);
            instance.fromJSON(json);
            return instance;
        }
        else if (type["fromJSON"]) {
            return type["fromJSON"](json);
        }
        else if (type !== Object) {
            return new type(json);
        }
    };
    return ObjectSerializer;
}(Serializer_1.Serializer));
exports.ObjectSerializer = ObjectSerializer;
(function (ObjectSerializer) {
    ObjectSerializer.instance = new ObjectSerializer();
    function getTypeSerializer(type, typeProviders) {
        var serializer = findTypeSerializer_1.findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        }
        else {
            return new ObjectSerializer(type);
        }
    }
    ObjectSerializer.getTypeSerializer = getTypeSerializer;
})(ObjectSerializer = exports.ObjectSerializer || (exports.ObjectSerializer = {}));
exports.ObjectSerializer = ObjectSerializer;
//# sourceMappingURL=ObjectSerializer.js.map