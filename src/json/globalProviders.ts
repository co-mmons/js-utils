import {ArraySerializer, BooleanSerializer, DateSerializer, NumberSerializer, StringSerializer} from "./serializers";
import {InternalTypeProvider} from "./TypeProvider";

export const globalProviders: InternalTypeProvider[] = [
    {type: Boolean, serializer: BooleanSerializer.instance},
    {type: Number, serializer: NumberSerializer.instance},
    {type: Date, name: "Date", serializer: DateSerializer.instance},
    {type: Array, serializer: ArraySerializer.ofAny},
    {type: String, serializer: StringSerializer.instance}
];

