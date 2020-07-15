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

    const c = new A();
    c.type = "C";
    console.log("c", c);

    const cSerialized = serialize(c);
    console.log("c serialized", cSerialized);

    const cUnserialized = unserialize(c, A);
    console.log("c unserialized", cUnserialized);

    return aUnserialized instanceof B;
}
