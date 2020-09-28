import { TimeZoneDate } from "../core/TimeZoneDate";
import { BooleanSerializer, DateSerializer, NumberSerializer, StringSerializer } from "./serializers";
export const globalProviders = [
    { type: Boolean, serializer: BooleanSerializer.instance },
    { type: Number, serializer: NumberSerializer.instance },
    { type: Date, name: "Date", serializer: DateSerializer.instance },
    { type: TimeZoneDate, name: "TimeZoneDate", serializer: DateSerializer.instance },
    { type: String, serializer: StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map