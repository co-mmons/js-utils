"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
var Enum = /** @class */ (function () {
    function Enum(name) {
        this.name = name;
        addValue(this.constructor, this);
    }
    Enum.values = function () {
        return valuesRef(this).slice();
    };
    Enum.fromJSON = function (value) {
        var name;
        if (typeof value === "string") {
            name = value;
        }
        else if (typeof value === "object" && typeof (value === null || value === void 0 ? void 0 : value.name) === "string") {
            name = value.name;
        }
        if (name) {
            for (var _i = 0, _a = valuesRef(this); _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.name === name) {
                    return v;
                }
            }
        }
        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + jsonTypeName(this));
    };
    Enum.valueOf = function (name) {
        CHECK_NAME: if (name) {
            if (typeof name === "object" && name) {
                if (name["@type"] === jsonTypeName(this)) {
                    name = name.name;
                }
                else {
                    break CHECK_NAME;
                }
            }
            for (var _i = 0, _a = valuesRef(this); _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.name === name) {
                    return v;
                }
            }
        }
        throw new Error("Invalid value " + JSON.stringify(name) + " for enum " + this.name);
    };
    Enum.prototype.equals = function (value) {
        if (typeof value === "string") {
            return value === this.name;
        }
        else if ("@type" in value) {
            return value["@type"] === jsonTypeName(this) && value.name === this.name;
        }
        else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }
        return false;
    };
    Enum.prototype.toJSON = function () {
        return { "@type": jsonTypeName(this), name: this.name };
    };
    return Enum;
}());
exports.Enum = Enum;
function addValue(enumClass, value) {
    valuesRef(enumClass).push(value);
}
function valuesRef(enumClass) {
    if (!enumClass["__enumValues"]) {
        enumClass["__enumValues"] = [];
    }
    return enumClass["__enumValues"];
}
function jsonTypeName(instanceOrClass) {
    var type;
    if (instanceOrClass instanceof Enum) {
        type = instanceOrClass.constructor;
    }
    else {
        type = instanceOrClass;
    }
    return type["jsonTypeName"] || type.name;
}
