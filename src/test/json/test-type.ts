import {jsonRegisteredType, jsonSerializable, serialize, unserialize} from "../../json";

@jsonSerializable()
export class X {
    static readonly jsonTypeName: string = "X";
}

@jsonRegisteredType()
@jsonSerializable()
export class A extends X {
    static readonly jsonTypeName: string = "A";
}

export function test() {

    const a = new A;
    console.log("a instance", a);

    const aSerialized = serialize(a);
    console.log("a serialized", aSerialized);

    const aUnserialized = unserialize(aSerialized);
    console.log("a unserialized", aUnserialized);

    const xUnserialized = unserialize(aSerialized, X);
    console.log("x unserialized", xUnserialized);

    return aUnserialized instanceof A && xUnserialized instanceof A;
}
