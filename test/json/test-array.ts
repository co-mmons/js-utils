import {serializable, serialize, unserialize, property} from "@co.mmons/js-utils/json";
import {ArraySerializer} from "@co.mmons/js-utils/json/serializers";

@serializable()
class Ha1 {
    static jsonTypeName = "Ha1";
}

@serializable()
class Ha extends Ha1 {
    static jsonTypeName = "Ha";
}

@serializable()
export class A {

    @property(new ArraySerializer(Ha1))
    aProp: Ha1[];
}

export function test() {

    const a = new A;
    a.aProp = [new Ha(), new Ha1];

    console.log("a instance", a);

    const aSerialized = serialize(a);
    console.log("a serialized", aSerialized);

    const aUnserialized = unserialize(aSerialized, A);
    console.log("a unserialized", aUnserialized);

    return aUnserialized instanceof A;
}
