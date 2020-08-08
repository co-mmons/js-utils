"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerEventsManager = void 0;
var tslib_1 = require("tslib");
var deep_clone_1 = require("./deep-clone");
var item_ref_impl_1 = require("./item-ref-impl");
var ContainerEventsManager = /** @class */ (function () {
    function ContainerEventsManager() {
        this.listeners = [];
    }
    ContainerEventsManager.prototype.addListener = function (listener, collection) {
        var _this = this;
        this.listeners.push({ listener: listener, collection: collection });
        return function () {
            for (var i = _this.listeners.length - 1; i >= 0; i--) {
                if (_this.listeners[i].listener === listener && ((!_this.listeners[i].collection && !collection) || (_this.listeners[i].collection === collection))) {
                    _this.listeners.splice(i, 1);
                }
            }
        };
    };
    ContainerEventsManager.prototype.fireEvent = function (event) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var listener = _c.value;
                if (!listener.collection || event.collection === listener.collection) {
                    try {
                        listener.listener({
                            ref: new item_ref_impl_1.PreferencesItemRefImpl(event.ref.collection, deep_clone_1.deepClone(event.ref.key)),
                            type: event.type,
                            collection: event.collection,
                            key: deep_clone_1.deepClone(event.key),
                            oldValue: deep_clone_1.deepClone(event.oldValue),
                            newValue: deep_clone_1.deepClone(event.newValue)
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return ContainerEventsManager;
}());
exports.ContainerEventsManager = ContainerEventsManager;
//# sourceMappingURL=container-events-manager.js.map