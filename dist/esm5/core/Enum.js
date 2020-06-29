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
        else if (typeof value === "object" && typeof value.name === "string") {
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
        throw new Error("Invalid value " + value + " for enum " + this.name);
    };
    Enum.valueOf = function (name) {
        if (typeof name === "object") {
            name = name.name;
        }
        for (var _i = 0, _a = valuesRef(this); _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.name === name) {
                return v;
            }
        }
        throw new Error("Invalid value " + name + " for enum " + this.name);
    };
    Enum.prototype.equals = function (name) {
        if (typeof name === "string") {
            return name === this.name;
        }
        else if (name.name === this.name) {
            return true;
        }
        return false;
    };
    Enum.prototype.toJSON = function () {
        return { name: this.name };
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
//# sourceMappingURL=Enum.js.map