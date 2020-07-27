"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSerializer = void 0;
var findTypeOrSerializerByName_1 = require("../findTypeOrSerializerByName");
var findTypeSerializer_1 = require("../findTypeSerializer");
var identifyType_1 = require("../identifyType");
var Serializer_1 = require("../Serializer");
var ObjectSerializer = /** @class */ (function (_super) {
    __extends(ObjectSerializer, _super);
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
            for (var _i = 0, _a = Object.keys(json); _i < _a.length; _i++) {
                var property = _a[_i];
                niu[property] = this.unserialize(json[property], options);
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
