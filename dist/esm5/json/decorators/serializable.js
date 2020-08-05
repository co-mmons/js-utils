import { __values } from "tslib";
import { getSupertypes } from "../getSupertypes";
import { setupSerialization } from "../setupSerialization";
export function serializable(options) {
    // when TsTransformer used, there can be up to 2 arguments
    // second argument is default options map, so we have to marge it
    if (arguments.length === 2) {
        options = Object.assign({}, options);
        for (var i = arguments.length - 1; i >= 0; i--) {
            options.properties = Object.assign(arguments[1].properties, options.properties);
        }
    }
    return function (classType) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        setupSerialization(classType);
        var classInternalType = classType;
        if (options === null || options === void 0 ? void 0 : options.properties) {
            var properties = classInternalType.__jsonProperties = (classInternalType.hasOwnProperty("__jsonProperties") && classInternalType.__jsonProperties) || {};
            try {
                for (var _e = __values(Object.keys(options.properties)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var propertyName = _f.value;
                    if (!(propertyName in properties)) {
                        properties[propertyName] = options.properties[propertyName];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (options === null || options === void 0 ? void 0 : options.types) {
            classInternalType.__jsonTypes = (classInternalType.hasOwnProperty("__jsonTypes") && classInternalType.__jsonTypes) || [];
            try {
                for (var _g = __values(options.types), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var types = _h.value;
                    try {
                        for (var _j = (e_3 = void 0, __values(Array.isArray(types) ? types : [types])), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var type = _k.value;
                            if (type.jsonTypeName) {
                                classInternalType.__jsonTypes.push({ name: type.jsonTypeName, type: type });
                            }
                            else {
                                classInternalType.__jsonTypes.push(type);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (classInternalType.hasOwnProperty("jsonTypeName") && classInternalType.jsonTypeName) {
            try {
                for (var _l = __values(getSupertypes(classInternalType)), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var supertype = _m.value;
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
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    };
}
//# sourceMappingURL=serializable.js.map