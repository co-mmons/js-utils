/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true.
 * If condition throws error, the promise will be rejected.
 */
export function waitTill(condition, interval) {
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
/**
 * Do nothing but sleep millisec.
 */
export function sleep(timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { return resolve(); }, timeout);
    });
}
//# sourceMappingURL=wait.js.map