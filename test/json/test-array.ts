import {serializable, serialize, unserialize, property} from "@co.mmons/js-utils/json";

@serializable()
class Ha1 {
    static jsonTypeName = "Ha1";
}

@serializable()
class Ha extends Ha1 {
    static jsonTypeName = "Ha";

    @property(Ha)
    gzz: Ha[];
}

@serializable()
export class A {

    @property(Ha1)
    aProp: Ha1[];
}

export function test() {

    const a = new A;
    const ha = new Ha();
    ha.gzz = [new Ha(), new Ha()];
    a.aProp = [ha, new Ha1];

    console.log("a instance");
    console.dir(a, {depth: null});

    const aSerialized = serialize(a);
    console.log("a serialized");
    console.dir(aSerialized, {depth: null});

    const aUnserialized = unserialize(aSerialized, A);
    console.log("a unserialized");
    console.dir(aUnserialized, {depth: null});

    return aUnserialized instanceof A;
}
