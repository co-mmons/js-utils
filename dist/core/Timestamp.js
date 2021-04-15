"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Date.prototype.toMillis = function () {
    return this.getTime();
};
Date.prototype.toDate = function () {
    return new Date(this.getTime());
};
//# sourceMappingURL=Timestamp.js.map