import {Property} from "../../src/json";
import {StringSerializer} from "../../src/json/string-serializer";
import {ArrayOfString} from "../../src/json/array-serializer";

export class ModelA {

    @Property(String, "baseFieldString")
    baseFieldString: string;

}

export class ModelB extends ModelA {

    constructor () {
        super();
    }

    @Property(String, "jsonFieldString")
    fieldString: string;

    @Property(Number)
    fieldNumber: number;

    @Property(Number)
    fieldNumberAsString: number;

    @Property(Boolean, "__fieldBoolean")
    fieldBoolean: boolean;

    @Property(ArrayOfString)
    fieldArray: string[];

}

export class ModelC {
    constructor (b: ModelB) {
        this.fieldModelB = b;
    }
    @Property(ModelB)
    fieldModelB: ModelB;

}
