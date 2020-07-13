import {ArraySerializer, jsonIgnore, jsonProperty, jsonSerialize, jsonType} from "../../json";

export class ModelA {

    baseFieldString: string = "ssd";

}

export class ModelB extends ModelA {

    constructor() {
        super();
        this.type = "B";
        console.log("called constructor b");
    }

    @jsonProperty()
    type: string;

    @jsonProperty(String, "jsonFieldString")
    fieldString: string;

    @jsonIgnore()
    fieldNumber: number = 1;

    fieldNumberAsString: number;

    @jsonProperty(Boolean, "__fieldBoolean")
    fieldBoolean: boolean;

    @jsonProperty(ArraySerializer.ofString)
    fieldArray: string[];

}

export class ModelC {
    constructor(b: ModelB) {
        this.fieldModelB = b;
    }

    @jsonProperty(ModelB)
    fieldModelB: ModelB;

}

@jsonSerialize()
export class ModelD extends ModelB {

    constructor() {
        super();
        this.type = "D";
        console.log("called constructor d");
    }

    fieldModelD: boolean;
}

@jsonType("ModelAutoRegister")
export class ModelAutoRegister {

}
