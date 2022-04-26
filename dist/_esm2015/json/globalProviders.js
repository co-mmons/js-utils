import { TimeZoneDate } from "../core/TimeZoneDate";
import { BooleanSerializer } from "./serializers/BooleanSerializer";
import { DateSerializer } from "./serializers/DateSerializer";
import { NumberSerializer } from "./serializers/NumberSerializer";
import { StringSerializer } from "./serializers/StringSerializer";
export const globalProviders = [
    { type: Boolean, serializer: BooleanSerializer.instance },
    { type: Number, serializer: NumberSerializer.instance },
    { type: Date, name: "Date", serializer: DateSerializer.instance },
    { type: TimeZoneDate, name: "TimeZoneDate", serializer: DateSerializer.instance },
    { type: String, serializer: StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map