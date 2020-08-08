"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = void 0;
const serializers_1 = require("./serializers");
function serialize(object, options) {
    return serializers_1.ObjectSerializer.instance.serialize(object, options);
}
exports.serialize = serialize;
//# sourceMappingURL=serialize.js.map