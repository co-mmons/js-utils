"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const deepMerge_1 = require("./deepMerge");
function merge(deep, ...objects) {
    if (deep) {
        return (0, deepMerge_1.deepMerge)(...objects);
    }
    else {
        return Object.assign({}, ...objects);
    }
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map