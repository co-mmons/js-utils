import {ArraySerializer} from "./serializers/ArraySerializer";
import {BooleanSerializer} from "./serializers/BooleanSerializer";
import {DateSerializer} from "./serializers/DateSerializer";
import {NumberSerializer} from "./serializers/NumberSerializer";
import {StringSerializer} from "./serializers/StringSerializer";
import {TypeProviderLike} from "./TypeProvider";

export const globalProviders: TypeProviderLike[] = [
    {type: Boolean, serializer: BooleanSerializer.instance},
    {type: Number, serializer: NumberSerializer.instance},
    {type: Date, name: "Date", serializer: DateSerializer.instance},
    {type: Array, serializer: ArraySerializer.ofAny},
    {type: String, serializer: StringSerializer.instance}
];

