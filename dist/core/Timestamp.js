"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementTimestampInDate = void 0;
function implementTimestampInDate() {
    if (Date.prototype.toMillis) {
        return;
    }
    Date.prototype.toMillis = function () {
        return this.getTime();
    };
    Date.prototype.toDate = function () {
        return new Date(this.getTime());
    };
}
exports.implementTimestampInDate = implementTimestampInDate;
implementTimestampInDate();
//# sourceMappingURL=Timestamp.js.map