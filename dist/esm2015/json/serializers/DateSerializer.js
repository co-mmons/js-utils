import { Serializer } from "../Serializer";
/**
 * Serializer for Date type.
 * Date is serialized to typed json: {"@type": "Date", value: Date.toISOString}.
 * Date can be unserialized from ISO string, timestamp number, Date instance of typed json.
 */
export class DateSerializer extends Serializer {
    serialize(value, options) {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        }
        else if (value instanceof Date) {
            return { "@type": "Date", value: value.toJSON() };
        }
        else if (options && options.notStrict && typeof value == "number") {
            return new Date(new Date().setTime(value)).toJSON();
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as Date`);
        }
        else {
            return undefined;
        }
    }
    unserialize(value, options) {
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
        else if (typeof value === "object" && typeof value.value === "string") {
            return new Date(value.value);
        }
        else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${value}" to Date`);
        }
        else {
            return undefined;
        }
    }
}
(function (DateSerializer) {
    DateSerializer.instance = new DateSerializer;
})(DateSerializer || (DateSerializer = {}));
//# sourceMappingURL=DateSerializer.js.map