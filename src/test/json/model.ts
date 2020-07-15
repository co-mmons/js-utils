import {ArraySerializer, jsonIgnore, jsonProperty, jsonSerializable, jsonRegisteredType} from "../../json";

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
    fieldWithJsonName: string;

    @jsonIgnore()
    ignoredFieldModelB: number;

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

@jsonSerializable()
export class ModelD extends ModelB {

    constructor() {
        super();
        this.type = "D";
        console.log("called constructor d");
    }

    fieldModelD: boolean;
}

@jsonRegisteredType()
export class ModelAutoRegister {
    static readonly jsonTypeName = "ModelAutoRegister";
}
