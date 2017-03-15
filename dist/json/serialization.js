"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require("../core");
function serialize(object, options) {
    return ObjectSerializer.instance.serialize(object, options);
}
exports.serialize = serialize;
function unserialize(json, targetClass) {
    if (json === undefined || json === null) {
        return json;
    }
    var serializer = serializerForType(targetClass);
    if (serializer && serializer !== ObjectSerializer.instance)
        return serializer.unserialize(json);
    var prototype = targetClass.prototype;
    // if type has subtypes, find apropriate subtype
    if (targetClass.hasOwnProperty("__json__subtypes")) {
        var subtypes = Object.getOwnPropertyDescriptor(targetClass, "__json__subtypes").value;
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
        instance.fromJSON(json);
        return instance;
    }
    else if (targetClass !== Object) {
        var instance = Object.create(prototype);
        targetClass.apply(instance, [json]);
        return instance;
    }
    return json;
}
exports.unserialize = unserialize;
function serializerForType(type) {
    if (type === Boolean)
        return BooleanSerializer.instance;
    if (type === Number)
        return NumberSerializer.instance;
    if (type === String)
        return StringSerializer.instance;
    if (type === Array)
        return ArraySerializer.ofAny;
    return ObjectSerializer.instance;
}
exports.serializerForType = serializerForType;
var Serializer = (function () {
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
exports.Serializer = Serializer;
var ArraySerializer = (function (_super) {
    __extends(ArraySerializer, _super);
    function ArraySerializer(valueType) {
        _super.call(this);
        if (arguments.length == 1 && !valueType) {
            throw "Value type passed to Json Array Serializer is undefined - check, whether class reference cycle";
        }
        this.valueType = valueType;
    }
    ArraySerializer.prototype.serialize = function (value, options) {
        var valueType = core_1.resolveForwardRef(this.valueType);
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
        var valueType = core_1.resolveForwardRef(this.valueType);
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
exports.ArraySerializer = ArraySerializer;
/**
 * @deprecated Use {@link ArraySerializer#ofAny}.
 */
exports.ArrayOfAny = ArraySerializer.ofAny;
/**
 * @deprecated Use {@link ArraySerializer#ofString}.
 */
exports.ArrayOfString = ArraySerializer.ofString;
/**
 * @deprecated Use {@link ArraySerializer#ofNumber}.
 */
exports.ArrayOfNumber = ArraySerializer.ofNumber;
/**
 * @deprecated Use {@link ArraySerializer#ofBoolean}.
 */
exports.ArrayOfBoolean = ArraySerializer.ofBoolean;
var ObjectSerializer = (function (_super) {
    __extends(ObjectSerializer, _super);
    function ObjectSerializer() {
        _super.apply(this, arguments);
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
var BooleanSerializer = (function (_super) {
    __extends(BooleanSerializer, _super);
    function BooleanSerializer() {
        _super.apply(this, arguments);
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
var NumberSerializer = (function (_super) {
    __extends(NumberSerializer, _super);
    function NumberSerializer() {
        _super.apply(this, arguments);
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
var StringSerializer = (function (_super) {
    __extends(StringSerializer, _super);
    function StringSerializer() {
        _super.apply(this, arguments);
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
//# sourceMappingURL=serialization.js.map