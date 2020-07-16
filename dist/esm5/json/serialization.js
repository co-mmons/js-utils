import { __extends } from "tslib";
import { resolveForwardRef } from "../core";
import { findTypeByName } from "./findTypeByName";
import { Serializer } from "./Serializer";
export function serialize(object, options) {
    if (object && object.toJSON) {
        return object.toJSON(options);
    }
    else if (Array.isArray(object)) {
        return ArraySerializer.ofAny.serialize(object, options);
    }
    else if (typeof object === "boolean" || object instanceof Boolean) {
        return BooleanSerializer.instance.serialize(object, options);
    }
    else if (typeof object === "number" || object instanceof Number) {
        return NumberSerializer.instance.serialize(object, options);
    }
    else if (typeof object === "string" || object instanceof String) {
        return StringSerializer.instance.serialize(object, options);
    }
    else if (object instanceof Date) {
        return DateSerializer.instance.serialize(object, options);
    }
    return ObjectSerializer.instance.serialize(object, options);
}
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    if (targetClass) {
        var internalType = targetClass;
        var serializer = serializerForType(targetClass);
        if (serializer && serializer !== ObjectSerializer.instance) {
            return serializer.unserialize(json, options);
        }
        if (targetClass.prototype["fromJSON"]) {
            var instance = Object.create(targetClass.prototype);
            instance.fromJSON(json, options);
            return instance;
        }
        else if (internalType.fromJSON) {
            return internalType.fromJSON(json, options);
        }
        else if (targetClass !== Object) {
            return new targetClass(json);
        }
    }
    if (typeof json === "object") {
        var knownType = findTypeByName(json);
        if (knownType) {
            return unserialize(json, knownType);
        }
        var niu = {};
        for (var _i = 0, _a = Object.keys(json); _i < _a.length; _i++) {
            var property = _a[_i];
            var value = json[property];
            if (typeof value === "object" && value) {
                var knownType_1 = findTypeByName(value);
                if (knownType_1) {
                    niu[property] = unserialize(value, knownType_1, options);
                    continue;
                }
            }
            niu[property] = unserialize(value, undefined, options);
        }
        return niu;
    }
    else if (Array.isArray(json)) {
        return ArraySerializer.ofAny.unserialize(json, options);
    }
    return json;
}
export function serializerForType(type) {
    if (type === Boolean)
        return BooleanSerializer.instance;
    if (type === Number)
        return NumberSerializer.instance;
    if (type === String)
        return StringSerializer.instance;
    if (type === Array)
        return ArraySerializer.ofAny;
    if (type === Date)
        return DateSerializer.instance;
    return ObjectSerializer.instance;
}
var ArraySerializer = /** @class */ (function (_super) {
    __extends(ArraySerializer, _super);
    function ArraySerializer(valueType) {
        var _this = _super.call(this) || this;
        if (arguments.length == 1 && !valueType) {
            throw "Value type passed to Json Array Serializer is undefined - check, whether class reference cycle";
        }
        _this.valueType = valueType;
        return _this;
    }
    ArraySerializer.prototype.serialize = function (value, options) {
        var valueType = resolveForwardRef(this.valueType);
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (Array.isArray(value)) {
            var array = [];
            if (valueType instanceof Serializer) {
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var i = value_1[_i];
                    array.push(valueType.serialize(i, options));
                }
            }
            else {
                for (var _a = 0, value_2 = value; _a < value_2.length; _a++) {
                    var i = value_2[_a];
                    array.push(serialize(i, options));
                }
            }
            return array;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as array";
        }
        else {
            return undefined;
        }
    };
    ArraySerializer.prototype.unserialize = function (json, options) {
        var valueType = this.valueType && resolveForwardRef(this.valueType);
        if (Array.isArray(json)) {
            var array = [];
            if (valueType) {
                if (valueType instanceof Serializer) {
                    for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                        var i = json_1[_i];
                        array.push(valueType.unserialize(i, options));
                    }
                }
                else {
                    for (var _a = 0, json_2 = json; _a < json_2.length; _a++) {
                        var i = json_2[_a];
                        array.push(unserialize(i, valueType, options));
                    }
                }
            }
            else {
                for (var _b = 0, json_3 = json; _b < json_3.length; _b++) {
                    var val = json_3[_b];
                    array.push(unserialize(val, undefined, options));
                }
            }
            return array;
        }
        else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + json + " to array.";
        }
        else {
            return undefined;
        }
    };
    ArraySerializer.ofAny = new ArraySerializer();
    ArraySerializer.ofString = new ArraySerializer(String);
    ArraySerializer.ofNumber = new ArraySerializer(Number);
    ArraySerializer.ofBoolean = new ArraySerializer(Boolean);
    return ArraySerializer;
}(Serializer));
export { ArraySerializer };
var ObjectSerializer = /** @class */ (function (_super) {
    __extends(ObjectSerializer, _super);
    function ObjectSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectSerializer.prototype.serialize = function (object, options) {
        if (object === null || object === undefined)
            return object;
        if (object.toJSON) {
            object = object.toJSON(options);
        }
        /*
        if (typeof object == "object") {

            for (let k in object) {
                if (object[k] === undefined || object[k] === null) {
                    delete object[k];
                }
            }

        }*/
        return object;
    };
    ObjectSerializer.prototype.unserialize = function (json, options) {
        if (this.isUndefinedOrNull(json)) {
            return json;
        }
        else if (options && typeof (options === null || options === void 0 ? void 0 : options["propertyType"]) === "function") {
            return unserialize(json, options["propertyType"], options);
        }
        else {
            return unserialize(json, findTypeByName(json), options);
        }
    };
    ObjectSerializer.instance = new ObjectSerializer();
    return ObjectSerializer;
}(Serializer));
var BooleanSerializer = /** @class */ (function (_super) {
    __extends(BooleanSerializer, _super);
    function BooleanSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "boolean") {
            return value;
        }
        else if (options && options.notStrict) {
            return value ? true : false;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as boolean";
        }
        else {
            return undefined;
        }
    };
    BooleanSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "boolean") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return value ? true : false;
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to boolean.";
        }
        else {
            return undefined;
        }
    };
    BooleanSerializer.instance = new BooleanSerializer();
    return BooleanSerializer;
}(Serializer));
var NumberSerializer = /** @class */ (function (_super) {
    __extends(NumberSerializer, _super);
    function NumberSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "number") {
            return value;
        }
        else if (options && options.notStrict && typeof value === "string") {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as number";
        }
        else {
            return undefined;
        }
    };
    NumberSerializer.prototype.unserialize = function (value, options) {
        if (typeof value === "number") {
            return value;
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (options && options.notStrict) {
            return parseFloat(value);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to number.";
        }
        else {
            return undefined;
        }
    };
    NumberSerializer.instance = new NumberSerializer();
    return NumberSerializer;
}(Serializer));
var StringSerializer = /** @class */ (function (_super) {
    __extends(StringSerializer, _super);
    function StringSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    StringSerializer.instance = new StringSerializer();
    return StringSerializer;
}(Serializer));
var DateSerializer = /** @class */ (function (_super) {
    __extends(DateSerializer, _super);
    function DateSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof Date) {
            return value;
        }
        else if (options && options.notStrict && typeof value == "number") {
            return new Date(new Date().setTime(value));
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot serialize "' + value + " as Date";
        }
        else {
            return undefined;
        }
    };
    DateSerializer.prototype.unserialize = function (value, options) {
        if (value instanceof Date) {
            return value;
        }
        else if (typeof value == "string") {
            return new Date(value);
        }
        else if (typeof value == "number" && options && options.notStrict) {
            return new Date(new Date().setTime(value));
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (!options || !options.ignoreErrors) {
            throw 'Cannot unserialize "' + value + " to Date.";
        }
        else {
            return undefined;
        }
    };
    DateSerializer.instance = new DateSerializer();
    return DateSerializer;
}(Serializer));
//# sourceMappingURL=serialization.js.map