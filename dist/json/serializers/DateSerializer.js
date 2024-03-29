"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSerializer = void 0;
const LocalDate_1 = require("../../core/LocalDate");
const TimeZoneDate_1 = require("../../core/TimeZoneDate");
const NoTimeDate_1 = require("../../core/NoTimeDate");
const Serializer_1 = require("../Serializer");
/**
 * Serializer for Date type.
 * Date is serialized to typed json: {"@type": "Date", value: Date.toISOString}.
 * Date can be unserialized from ISO string, timestamp number, Date instance of typed json.
 */
class DateSerializer extends Serializer_1.Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof TimeZoneDate_1.TimeZoneDate || value instanceof LocalDate_1.LocalDate || value instanceof NoTimeDate_1.NoTimeDate) {
            return value.toJSON();
        }
        else if (value instanceof Date) {
            return { "@type": "Date", value: value.toJSON() };
        }
        else if (typeof value === "object" && typeof value.toDate === "function" && typeof value.toMillis === "function") {
            return { "@type": "Date", value: value.toDate().toJSON() };
        }
        else if (options && options.notStrict && typeof value == "number") {
            return { "@type": "Date", value: new Date(value).toJSON() };
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as Date`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        }
        else if (value instanceof Date) {
            return value;
        }
        else if (typeof value === "string") {
            return new Date(value);
        }
        else if (typeof value === "number" && options && options.notStrict) {
            return new Date(new Date().setTime(value));
        }
        else if (typeof value === "object" && typeof value.toDate === "function" && typeof value.toMillis === "function") {
            return value.toDate();
        }
        else if (typeof value === "object" && value["@type"] === NoTimeDate_1.NoTimeDate.jsonTypeName && value.date) {
            return NoTimeDate_1.NoTimeDate.fromJSON(value.date);
        }
        else if (typeof value === "object" && value["@type"] === TimeZoneDate_1.TimeZoneDate.jsonTypeName && value.date) {
            return TimeZoneDate_1.TimeZoneDate.fromJSON(value);
        }
        else if (typeof value === "object" && value["@type"] === LocalDate_1.LocalDate.jsonTypeName && value.date) {
            return LocalDate_1.LocalDate.fromJSON(value.date);
        }
        else if (typeof value === "object" && value["@type"] === "Date" && value.value) {
            return new Date(value.value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to Date, LocalDate or TimeZoneDate`);
        }
        else {
            return undefined;
        }
    }
}
exports.DateSerializer = DateSerializer;
(function (DateSerializer) {
    DateSerializer.instance = new DateSerializer;
})(DateSerializer = exports.DateSerializer || (exports.DateSerializer = {}));
//# sourceMappingURL=DateSerializer.js.map