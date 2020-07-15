/**
 * Do nothing but sleep millisec.
 */
export function sleep(timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(); }, timeout);
    });
}
//# sourceMappingURL=sleep.js.map