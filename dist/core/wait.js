"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitTill = void 0;
/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true.
 * If condition throws error, the promise will be rejected.
 */
function waitTill(condition, interval, timeout) {
    if (interval === void 0) { interval = 100; }
    return new Promise(function (resolve, reject) {
        var intervalId;
        var finished = false;
        var test = function () {
            try {
                if (condition() === true) {
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    finished = true;
                    resolve();
                    return true;
                }
            }
            catch (error) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                finished = true;
                reject(error);
            }
            return false;
        };
        if (!test()) {
            intervalId = setInterval(test, interval === undefined || interval === null || interval < 0 ? 100 : interval);
            if (timeout > 0) {
                setTimeout(function () {
                    if (!finished) {
                        if (intervalId) {
                            clearInterval(intervalId);
                        }
                        reject(new Error("Timeout of waitTill"));
                    }
                }, timeout);
            }
        }
    });
}
exports.waitTill = waitTill;
//# sourceMappingURL=wait.js.map