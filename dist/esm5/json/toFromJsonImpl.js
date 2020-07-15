import { resolveForwardRef } from "../core";
import { getPrototypes } from "./getPrototypes";
import { getTypesFromPrototypes } from "./getTypesFromPrototypes";
import { serializerForType } from "./serialization";
import { Serializer } from "./Serializer";
export function toJsonImpl() {
    var prototypes = getPrototypes(this);
    var types = getTypesFromPrototypes(prototypes);
    var json = {};
    // call toJSON for super types, only if hard coded in a class
    for (var t = 1; t < types.length; t++) {
        if (!types[t].__jsonToJson && prototypes[t].hasOwnProperty("toJSON")) {
            var prototypeJson = prototypes[t].toJSON.call(this);
            if (typeof prototypeJson === "object") {
                json = prototypeJson;
            }
            break;
        }
    }
    var properties = getProperties(this, types);
    for (var propertyName in properties) {
        var propertyConfig = properties[propertyName];
        var propertyValue = this[propertyName];
        var jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
        var serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType : serializerForType(propertyConfig.propertyType);
        json[jsonName] = serializer.serialize(propertyValue, propertyConfig);
    }
    if (types[0].jsonTypeName) {
        json["@type"] = types[0].jsonTypeName;
    }
    return json;
}
export function fromJsonImpl(json, options) {
    var internalType = this;
    var instance;
    if (!instance && internalType.__jsonSubtypes) {
        for (var _i = 0, _a = internalType.__jsonSubtypes; _i < _a.length; _i++) {
            var subtype = _a[_i];
            var matchedType = void 0;
            if (subtype.matcher) {
                var match = subtype.matcher(json);
                if (match) {
                    matchedType = resolveForwardRef(match);
                }
            }
            else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] === subtype.value))) {
                matchedType = resolveForwardRef(subtype.type);
            }
            if (matchedType && matchedType !== this) {
                if (matchedType.hasOwnProperty("fromJSON")) {
                    return matchedType.fromJSON(json, options);
                }
                instance = new matchedType;
                break;
            }
        }
    }
    if (!instance) {
        instance = new this();
    }
    var prototypes = getPrototypes(instance);
    var types = getTypesFromPrototypes(prototypes);
    var properties = getProperties(instance, types);
    for (var propertyName in properties) {
        var propertyConfig = properties[propertyName];
        var jsonName = propertyConfig.propertyJsonName ? propertyConfig.propertyJsonName : propertyName;
        var serializer = propertyConfig.propertyType instanceof Serializer ? propertyConfig.propertyType : serializerForType(propertyConfig.propertyType);
        if (jsonName in json) {
            instance[propertyName] = serializer.unserialize(json[jsonName], propertyConfig);
        }
    }
    return instance;
}
function getProperties(thiz, types) {
    var names = Object.getOwnPropertyNames(thiz);
    var properties = {};
    for (var propertyName in thiz) {
        if (typeof thiz[propertyName] !== "function") {
            properties[propertyName] = {};
        }
    }
    for (var t = types.length - 1; t >= 0; t--) {
        var internalType = types[t];
        if (internalType.__jsonSerialization) {
            if (internalType.__jsonProperties) {
                properties = Object.assign(properties, internalType.__jsonProperties);
            }
            if (internalType.__jsonIgnoredProperties) {
                for (var _i = 0, _a = internalType.__jsonIgnoredProperties; _i < _a.length; _i++) {
                    var propertyName = _a[_i];
                    delete properties[propertyName];
                }
            }
        }
    }
    return properties;
}
//# sourceMappingURL=toFromJsonImpl.js.map