"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true.
 * If condition throws error, the promise will be rejected.
 */
function waitTill(condition, interval = 100, timeout) {
    return new Promise((resolve, reject) => {
        let intervalId;
        let finished = false;
        let test = () => {
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
                setTimeout(() => {
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
/**
 * Do nothing but sleep millisec.
 */
function sleep(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=wait.js.map