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
        throw new Error("Invalid value " + JSON.stringify(value) + " for enum " + this.jsonTypeName);
    };
    Object.defineProperty(Enum, "jsonTypeName", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Enum.valueOf = function (name) {
        CHECK_NAME: if (name) {
            if (typeof name === "object") {
                if (name["@type"] === this.jsonTypeName) {
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
            return value["@type"] === this.__jsonTypeName && value.name === this.name;
        }
        else if (value.constructor === this.constructor) {
            return value.name === this.name;
        }
        return false;
    };
    Enum.prototype.toJSON = function () {
        return { "@type": this.__jsonTypeName, name: this.name };
    };
    Object.defineProperty(Enum.prototype, "__jsonTypeName", {
        get: function () {
            return this.constructor["jsonTypeName"] || this.constructor.name;
        },
        enumerable: true,
        configurable: true
    });
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