"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromJsonImpl = exports.toJsonImpl = void 0;
var tslib_1 = require("tslib");
var core_1 = require("../core");
var findTypeSerializer_1 = require("./findTypeSerializer");
var getPrototypesTree_1 = require("./getPrototypesTree");
var identifyType_1 = require("./identifyType");
var Serializer_1 = require("./Serializer");
var serializers_1 = require("./serializers");
function toJsonImpl() {
    var prototypesTree = getPrototypesTree_1.getPrototypesTree(this);
    var typesTree = getTypesTree(prototypesTree);
    var json = {};
    // call toJSON for super types, only if hard coded in a class
    for (var t = 1; t < typesTree.length; t++) {
        if (!typesTree[t].__jsonToJson && prototypesTree[t].hasOwnProperty("toJSON")) {
            var prototypeJson = prototypesTree[t].toJSON.call(this);
            if (prototypeJson && typeof prototypeJson === "object") {
                json = prototypeJson;
            }
            break;
        }
    }
    var properties = getDeclaredProperties(this, typesTree);
    for (var propertyName in properties) {
        var config = properties[propertyName];
        var value = this[propertyName];
        if (value === undefined) {
            continue;
        }
        var type = config.propertyType ? config.propertyType : identifyType_1.identifyType(value);
        var serializer = type instanceof Serializer_1.Serializer ? type : findTypeSerializer_1.findTypeSerializer(type, typesTree[0].__jsonTypes);
        var name_1 = config.propertyJsonName ? config.propertyJsonName : propertyName;
        if (serializer) {
            json[name_1] = serializer.serialize(value);
        }
        else {
            json[name_1] = new serializers_1.ObjectSerializer(type).serialize(value, { typeProviders: typesTree[0].__jsonTypes });
        }
    }
    if (typesTree[0].hasOwnProperty("jsonTypeName")) {
        json["@type"] = typesTree[0].jsonTypeName;
    }
    return json;
}
exports.toJsonImpl = toJsonImpl;
function fromJsonImpl(json) {
    var e_1, _a;
    var internalType = this;
    var instance;
    if (!instance && internalType.__jsonSubtypes) {
        try {
            for (var _b = tslib_1.__values(internalType.__jsonSubtypes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var subtype = _c.value;
                var matchedType = void 0;
                if (subtype.matcher) {
                    var match = subtype.matcher(json);
                    if (match) {
                        matchedType = core_1.resolveForwardRef(match);
                    }
                }
                else if (subtype.property && ((typeof subtype.value === "function" && subtype.value(json[subtype.property])) || (typeof subtype.value !== "function" && json[subtype.property] === subtype.value))) {
                    matchedType = core_1.resolveForwardRef(subtype.type);
                }
                if (matchedType && matchedType !== this) {
                    if (matchedType.hasOwnProperty("fromJSON")) {
                        return matchedType.fromJSON(json);
                    }
                    instance = new matchedType;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (!instance) {
        instance = new this();
    }
    var prototypesTree = getPrototypesTree_1.getPrototypesTree(instance);
    var typesTree = getTypesTree(prototypesTree);
    var properties = getDeclaredProperties(instance, typesTree);
    // property names that already unserialized
    var unserializedProperties = [];
    // unserialize known properties
    for (var propertyName in properties) {
        var config = properties[propertyName];
        var name_2 = config.propertyJsonName ? config.propertyJsonName : propertyName;
        if (name_2 in json) {
            var value = json[name_2];
            var type = config.propertyType ? config.propertyType : identifyType_1.identifyType(value);
            var serializer = type instanceof Serializer_1.Serializer ? type : findTypeSerializer_1.findTypeSerializer(type, typesTree[0].__jsonTypes);
            if (!serializer) {
                serializer = new serializers_1.ObjectSerializer(type);
            }
            instance[propertyName] = serializer.unserialize(value, { typeProviders: typesTree[0].__jsonTypes });
            unserializedProperties.push(name_2);
        }
    }
    // copy json properties, that were not unserialized above
    for (var propertyName in json) {
        if (propertyName === "@type" && typesTree[0].jsonTypeName) {
            continue;
        }
        if (unserializedProperties.indexOf(propertyName) < 0) {
            instance[propertyName] = serializers_1.ObjectSerializer.instance.unserialize(json[propertyName], { typeProviders: typesTree[0].__jsonTypes });
        }
    }
    return instance;
}
exports.fromJsonImpl = fromJsonImpl;
function getTypesTree(prototypes) {
    return prototypes.map(function (type) { return type.constructor; });
}
function getDeclaredProperties(thiz, types) {
    var e_2, _a;
    var properties = {};
    for (var t = types.length - 1; t >= 0; t--) {
        var internalType = types[t];
        if (internalType.__jsonSerialization) {
            if (internalType.__jsonProperties) {
                properties = Object.assign(properties, internalType.__jsonProperties);
            }
            if (internalType.__jsonIgnoredProperties) {
                try {
                    for (var _b = (e_2 = void 0, tslib_1.__values(internalType.__jsonIgnoredProperties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var propertyName = _c.value;
                        delete properties[propertyName];
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
    }
    return properties;
}
//# sourceMappingURL=toFromJsonImpl.js.map