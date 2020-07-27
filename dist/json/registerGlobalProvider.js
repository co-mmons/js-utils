"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGlobalProvider = void 0;
var globalProviders_1 = require("./globalProviders");
function registerGlobalProvider() {
    var typeClass = arguments[0];
    var typeName = arguments.length > 0 && typeof arguments[1] === "string" ? arguments[1] : typeClass.jsonTypeName;
    var options = arguments.length === 2 && typeof arguments[1] === "object" && arguments[1] ? arguments[1] : (arguments.length === 3 && typeof arguments[2] === "object" && arguments[2] ? arguments[2] : undefined);
    if (globalProviders_1.globalProviders[typeName] && globalProviders_1.globalProviders[typeName] !== typeClass && (!options || !options.replace)) {
        throw new Error("Type " + typeName + " already registered wither other class");
    }
    globalProviders_1.globalProviders.push({ name: typeName, type: typeClass });
}
exports.registerGlobalProvider = registerGlobalProvider;
