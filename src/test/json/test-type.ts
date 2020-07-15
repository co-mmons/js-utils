import {jsonType, serialize, unserialize} from "../../json";

@jsonType("A")
export class A {
}

export function test() {

    const a = new A;
    console.log("instance", a);

    const serialized = serialize(a);
    console.log("serialized", serialized);

    const unserialized = unserialize(serialized);
    console.log("unserialized", unserialized);

    return unserialized instanceof A;
}
