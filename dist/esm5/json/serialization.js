import * as tslib_1 from "tslib";
import { resolveForwardRef } from "../core";
export function serialize(object, options) {
    return ObjectSerializer.instance.serialize(object, options);
}
export function unserialize(json, targetClass, options) {
    if (json === undefined || json === null) {
        return json;
    }
    var serializer = serializerForType(targetClass);
    if (serializer && serializer !== ObjectSerializer.instance)
        return serializer.unserialize(json, options);
    var prototype = targetClass.prototype;
    // if type has subtypes, find apropriate subtype
    if (targetClass.hasOwnProperty("__json__subtypes")) {
        var subtypes = Object.getOwnPropertyDescriptor(targetClass, "__json__subtypes").value /* as SubtypeInfo[]*/;
        for (var _i = 0, subtypes_1 = subtypes; _i < subtypes_1.length; _i++) {
            var subtype = subtypes_1[_i];
            if (json[subtype.property] == subtype.value) {
                prototype = subtype.typeRef.call(null).prototype;
                break;
            }
        }
    }
    if (prototype["fromJSON"]) {
        var instance = Object.create(prototype);
        instance.fromJSON(json, options);
        return instance;
    }
    else if (targetClass !== Object) {
        return new targetClass(json);
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
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    Serializer.prototype.serialize = function (object, options) {
        return object;
    };
    Serializer.prototype.isUndefinedOrNull = function (value) {
        return value === undefined || value === null;
    };
    Serializer.prototype.serializeUndefinedOrNull = function (value, options) {
        return value;
    };
    Serializer.prototype.unserializeUndefinedOrNull = function (value, options) {
        if (options && options.disallowUndefinedOrNull) {
            throw "Undefined/null value is not allowed";
        }
        else {
            return value;
        }
    };
    return Serializer;
}());
export { Serializer };
var ArraySerializer = /** @class */ (function (_super) {
    tslib_1.__extends(ArraySerializer, _super);
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
                    array.push(serialize(i));
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
        var valueType = resolveForwardRef(this.valueType);
        if (Array.isArray(json)) {
            if (valueType) {
                var array = [];
                if (valueType instanceof Serializer) {
                    for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                        var i = json_1[_i];
                        array.push(valueType.unserialize(i));
                    }
                }
                else {
                    for (var _a = 0, json_2 = json; _a < json_2.length; _a++) {
                        var i = json_2[_a];
                        array.push(unserialize(i, valueType));
                    }
                }
                return array;
            }
            else {
                return json;
            }
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
/**
 * @deprecated Use {@link ArraySerializer#ofAny}.
 */
export var ArrayOfAny = ArraySerializer.ofAny;
/**
 * @deprecated Use {@link ArraySerializer#ofString}.
 */
export var ArrayOfString = ArraySerializer.ofString;
/**
 * @deprecated Use {@link ArraySerializer#ofNumber}.
 */
export var ArrayOfNumber = ArraySerializer.ofNumber;
/**
 * @deprecated Use {@link ArraySerializer#ofBoolean}.
 */
export var ArrayOfBoolean = ArraySerializer.ofBoolean;
var ObjectSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectSerializer, _super);
    function ObjectSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectSerializer.prototype.serialize = function (object, options) {
        if (object === null || object === undefined)
            return object;
        if (object.toJSON) {
            object = object.toJSON();
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
        if (this.isUndefinedOrNull(json))
            return json;
        else if (options && typeof options["propertyType"] === "function") {
            return unserialize(json, options["propertyType"]);
        }
        return json;
    };
    ObjectSerializer.instance = new ObjectSerializer();
    return ObjectSerializer;
}(Serializer));
var BooleanSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(BooleanSerializer, _super);
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
    tslib_1.__extends(NumberSerializer, _super);
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
    tslib_1.__extends(StringSerializer, _super);
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
    tslib_1.__extends(DateSerializer, _super);
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