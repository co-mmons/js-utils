import {jsonSubtype, serialize, unserialize} from "../../json/";

class A {
    type: string;
}

@jsonSubtype(A, "type", "B")
class B extends A {
    constructor() {
        super();
        this.type = "B";
    }

    timestamp: Date;
}

export function test() {

    const b = new B();
    b.timestamp = new Date();
    console.log("b", b);

    const bSerialized = serialize(b);
    console.log("b serialized", b);

    const aUnserialized = unserialize(bSerialized, A);
    console.log("a unserialized", aUnserialized);

    return aUnserialized instanceof B;
}
