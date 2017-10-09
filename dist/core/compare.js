"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareDate(first, second) {
    return (first ? first.getTime() : 0) - (second ? second.getTime() : 0);
}
exports.compareDate = compareDate;
//# sourceMappingURL=compare.js.map