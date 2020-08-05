import { __values } from "tslib";
var Enum = /** @class */ (function () {
    function Enum(name) {
        this.name = name;
        addValue(this.constructor, this);
    }
    Enum.values = function () {
        return valuesRef(this).slice();
    };
    Enum.fromJSON = function (value) {
        var e_1, _a;
        var name;
        if (typeof value === "string") {
            name = value;
        }
        else if (typeof value === "object" && typeof (value === null || value === void 0 ? void 0 : value.name) === "string") {
            name = value.name;
        }
        if (name) {
            try {
                for (var _b = __values(valuesRef(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    if (v.name === name) {
                        return v;
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
        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + jsonTypeName(this));
    };
    Enum.valueOf = function (name) {
        var e_2, _a;
        CHECK_NAME: if (name) {
            if (typeof name === "object" && name) {
                if (name["@type"] === jsonTypeName(this)) {
                    name = name.name;
                }
                else {
                    break CHECK_NAME;
                }
            }
            try {
                for (var _b = __values(valuesRef(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var v = _c.value;
                    if (v.name === name) {
                        return v;
                    }
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
export { Enum };
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
//# sourceMappingURL=Enum.js.map