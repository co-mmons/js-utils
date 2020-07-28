"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializable = void 0;
var getSupertypes_1 = require("../getSupertypes");
var setupSerialization_1 = require("../setupSerialization");
function serializable(options) {
    // when TsTransformer used, there can be up to 2 arguments
    // second argument is default options map, so we have to marge it
    if (arguments.length === 2) {
        options = Object.assign({}, options);
        for (var i = arguments.length - 1; i >= 0; i--) {
            options.properties = Object.assign(arguments[1].properties, options.properties);
        }
    }
    return function (classType) {
        setupSerialization_1.setupSerialization(classType);
        var classInternalType = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            var properties = classInternalType.__jsonProperties = (classInternalType.hasOwnProperty("__jsonProperties") && classInternalType.__jsonProperties) || {};
            for (var _i = 0, _a = Object.keys(options.properties); _i < _a.length; _i++) {
                var propertyName = _a[_i];
                if (!(propertyName in properties)) {
                    properties[propertyName] = options.properties[propertyName];
                }
            }
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            classInternalType.__jsonTypes = (classInternalType.hasOwnProperty("__jsonTypes") && classInternalType.__jsonTypes) || [];
            for (var _b = 0, _c = options.types; _b < _c.length; _b++) {
                var types = _c[_b];
                for (var _d = 0, _e = Array.isArray(types) ? types : [types]; _d < _e.length; _d++) {
                    var type = _e[_d];
                    if (type.jsonTypeName) {
                        classInternalType.__jsonTypes.push({ name: type.jsonTypeName, type: type });
                    }
                    else {
                        classInternalType.__jsonTypes.push(type);
                    }
                }
            }
        }
        if (classInternalType.hasOwnProperty("jsonTypeName") && classInternalType.jsonTypeName) {
            for (var _f = 0, _g = getSupertypes_1.getSupertypes(classInternalType); _f < _g.length; _f++) {
                var supertype = _g[_f];
                if (supertype.hasOwnProperty("__jsonSerialization") && supertype.__jsonSerialization) {
                    var types = supertype.__jsonSubtypes = (supertype.hasOwnProperty("__jsonSubtypes") && supertype.__jsonSubtypes) || [];
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
exports.serializable = serializable;
//# sourceMappingURL=serializable.js.map