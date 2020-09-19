import { TimeZoneDate } from "../core/TimeZoneDate";
import { ArraySerializer, BooleanSerializer, DateSerializer, NumberSerializer, StringSerializer } from "./serializers";
export var globalProviders = [
    { type: Boolean, serializer: BooleanSerializer.instance },
    { type: Number, serializer: NumberSerializer.instance },
    { type: Date, name: "Date", serializer: DateSerializer.instance },
    { type: TimeZoneDate, name: "TimeZoneDate", serializer: DateSerializer.instance },
    { type: Array, serializer: ArraySerializer.ofAny },
    { type: String, serializer: StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map