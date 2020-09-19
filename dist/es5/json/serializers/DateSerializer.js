"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSerializer = void 0;
var tslib_1 = require("tslib");
var TimeZoneDate_1 = require("../../core/TimeZoneDate");
var Serializer_1 = require("../Serializer");
/**
 * Serializer for Date type.
 * Date is serialized to typed json: {"@type": "Date", value: Date.toISOString}.
 * Date can be unserialized from ISO string, timestamp number, Date instance of typed json.
 */
var DateSerializer = /** @class */ (function (_super) {
    tslib_1.__extends(DateSerializer, _super);
    function DateSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateSerializer.prototype.serialize = function (value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof TimeZoneDate_1.TimeZoneDate) {
            return value.toJSON();
        }
        else if (value instanceof Date) {
            return { "@type": "Date", value: value.toJSON() };
        }
        else if (options && options.notStrict && typeof value == "number") {
            return new Date(new Date().setTime(value)).toJSON();
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot serialize \"" + value + "\" as Date");
        }
        else {
            return undefined;
        }
    };
    DateSerializer.prototype.unserialize = function (value, options) {
        if (value instanceof Date) {
            return value;
        }
        else if (typeof value === "string") {
            return new Date(value);
        }
        else if (typeof value === "number" && options && options.notStrict) {
            return new Date(new Date().setTime(value));
        }
        else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (typeof value === "object" && value["@type"] === "TimeZoneDate" && typeof value.date === "string") {
            return new TimeZoneDate_1.TimeZoneDate(new Date(value.date), value.timeZone);
        }
        else if (typeof value === "object" && value["@type"] === "Date" && typeof value.value === "string") {
            return new Date(value.value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error("Cannot unserialize \"" + value + "\" to Date or TimeZoneDate");
        }
        else {
            return undefined;
        }
    };
    return DateSerializer;
}(Serializer_1.Serializer));
exports.DateSerializer = DateSerializer;
(function (DateSerializer) {
    DateSerializer.instance = new DateSerializer;
})(DateSerializer = exports.DateSerializer || (exports.DateSerializer = {}));
exports.DateSerializer = DateSerializer;
//# sourceMappingURL=DateSerializer.js.map