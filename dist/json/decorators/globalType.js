"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalType = void 0;
const registerGlobalProvider_1 = require("../registerGlobalProvider");
function globalType(options) {
    return function (classType) {
        (0, registerGlobalProvider_1.registerGlobalProvider)({ name: classType.jsonTypeName, type: classType }, options);
    };
}
exports.globalType = globalType;
//# sourceMappingURL=globalType.js.map