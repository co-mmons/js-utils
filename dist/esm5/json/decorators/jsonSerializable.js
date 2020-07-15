import { getSupertypes } from "../getSupertypes";
import { registerType } from "../registerType";
import { setupSerialization } from "../setupSerialization";
export function jsonSerializable(options) {
    return function (classType) {
        setupSerialization(classType);
        var type = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            var properties = type.__jsonProperties = Object.assign(type.__jsonProperties || {}, options.properties);
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            for (var _i = 0, _a = options.types; _i < _a.length; _i++) {
                var typ = _a[_i];
                registerType(typ);
            }
        }
        if (type.jsonTypeName) {
            for (var _b = 0, _c = getSupertypes(type); _b < _c.length; _b++) {
                var supertype = _c[_b];
                if (supertype.__jsonSerialization) {
                    var types = supertype.__jsonSubtypes = supertype.__jsonSubtypes || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: type.jsonTypeName
                    });
                    break;
                }
            }
        }
    };
}
//# sourceMappingURL=jsonSerializable.js.map