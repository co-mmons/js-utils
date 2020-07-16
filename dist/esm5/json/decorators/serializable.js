import { getSupertypes } from "../getSupertypes";
import { setupSerialization } from "../setupSerialization";
export function serializable(options) {
    return function (classType) {
        setupSerialization(classType);
        var classInternalType = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            classInternalType.__jsonProperties = Object.assign(classInternalType.__jsonProperties || {}, options.properties);
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            classInternalType.__jsonTypes = classInternalType.__jsonTypes || [];
            for (var _i = 0, _a = options.types; _i < _a.length; _i++) {
                var types = _a[_i];
                for (var _b = 0, _c = Array.isArray(types) ? types : [types]; _b < _c.length; _b++) {
                    var type = _c[_b];
                    if (type.jsonTypeName) {
                        classInternalType.__jsonTypes.push({ name: type.jsonTypeName, type: type });
                    }
                    else {
                        classInternalType.__jsonTypes.push(type);
                    }
                }
            }
        }
        if (classInternalType.jsonTypeName) {
            for (var _d = 0, _e = getSupertypes(classInternalType); _d < _e.length; _d++) {
                var supertype = _e[_d];
                if (supertype.__jsonSerialization) {
                    var types = supertype.__jsonSubtypes = supertype.__jsonSubtypes || [];
                    types.push({
                        type: classType,
                        property: "@type",
                        value: classInternalType.jsonTypeName
                    });
                    break;
                }
            }
        }
    };
}
//# sourceMappingURL=serializable.js.map