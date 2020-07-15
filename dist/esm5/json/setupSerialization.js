import { fromJsonImpl, toJsonImpl } from "./toFromJsonImpl";
export function setupSerialization(type) {
    var internalType = type;
    internalType.__jsonSerialization = true;
    if (!type.prototype.hasOwnProperty("toJSON")) {
        internalType.__jsonToJson = true;
        type.prototype.toJSON = function () {
            return toJsonImpl.call(this);
        };
    }
    if (!type.hasOwnProperty("fromJSON")) {
        internalType.__jsonFromJson = true;
        internalType.fromJSON = function (json) {
            return fromJsonImpl.call(this, json);
        };
    }
}
//# sourceMappingURL=setupSerialization.js.map