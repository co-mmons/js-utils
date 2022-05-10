import {TimeZoneDate} from "../core/TimeZoneDate";
import {LocalDate} from "../core/LocalDate";
import {BooleanSerializer} from "./serializers/BooleanSerializer";
import {DateSerializer} from "./serializers/DateSerializer";
import {NumberSerializer} from "./serializers/NumberSerializer";
import {StringSerializer} from "./serializers/StringSerializer";
import {InternalTypeProvider} from "./TypeProvider";

export const globalProviders: InternalTypeProvider[] = [
    {type: Boolean, serializer: BooleanSerializer.instance},
    {type: Number, serializer: NumberSerializer.instance},
    {type: Date, name: "Date", serializer: DateSerializer.instance},
    {type: LocalDate, name: LocalDate.jsonTypeName, serializer: DateSerializer.instance},
    {type: TimeZoneDate, name: TimeZoneDate.jsonTypeName, serializer: DateSerializer.instance},
    {type: String, serializer: StringSerializer.instance}
];

