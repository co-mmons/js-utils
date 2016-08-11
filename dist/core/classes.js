"use strict";
function Final(target, propertyKey) {
    var value = target[propertyKey];
    if (!value) {
        Object.defineProperty(target, propertyKey, {
            set: function (value) {
                Object.defineProperty(this, propertyKey, {
                    get: function () {
                        return value;
                    },
                    enumerable: true,
                    configurable: false
                });
            },
            enumerable: true,
            configurable: true
        });
    }
    else {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return value;
            },
            enumerable: true
        });
    }
}
exports.Final = Final;
//# sourceMappingURL=classes.js.map