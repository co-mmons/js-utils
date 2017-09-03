"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true.
 * If condition throws error, the promise will be rejected.
 */
function waitTill(condition, interval) {
    if (interval === void 0) { interval = 100; }
    return new Promise(function (resolve, reject) {
        var intervalId;
        var test = function () {
            try {
                if (condition() === true) {
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    resolve();
                    return true;
                }
            }
            catch (error) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                reject(error);
            }
            return false;
        };
        if (!test()) {
            setInterval(test, interval);
        }
    });
}
exports.waitTill = waitTill;
/**
 * Do nothing but sleep millisec.
 */
function sleep(timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { return resolve(); }, timeout);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=wait.js.map