"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalType = void 0;
var registerGlobalProvider_1 = require("../registerGlobalProvider");
function globalType(options) {
    return function (classType) {
        registerGlobalProvider_1.registerGlobalProvider({ name: classType.jsonTypeName, type: classType }, options);
    };
}
exports.globalType = globalType;
//# sourceMappingURL=globalType.js.map