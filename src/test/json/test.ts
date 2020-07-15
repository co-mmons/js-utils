import {findTypeByName, registerType, serialize, unserialize} from "../../json";
import {ModelAutoRegister, ModelB, ModelD} from "./model";

(async () => {

    if (false) {

        const model: ModelB = new ModelB();
        model.fieldWithJsonName = "aaaa";
        model.ignoredFieldModelB = 121212;
        model.fieldNumberAsString = 232323;
        model.fieldBoolean = true;
        model.baseFieldString = "bbbb";
        model.fieldArray = ["asas"];

        console.log("ModelB:");
        console.log(model);

        const modelSerialized: any = serialize(model);
        console.log("Serialize ModelB:");
        console.log(modelSerialized);

        const modelUnserialized: ModelB = unserialize(modelSerialized, ModelB) as ModelB;
        console.log("Unserialize ModelB:");
        console.log(modelUnserialized);
        /*
        var modelC = new ModelC(model) ;
        console.log("ModelC:");
        console.log(modelC);

        var modelCSerialized: any = serialize(modelC);
        console.log("Serialize ModelC:");
        console.log(modelCSerialized);

        var modelCUnserialized: ModelC = unserialize(modelCSerialized, ModelC) as ModelC;
        console.log("Unserialize ModelC:");
        console.log(modelCUnserialized);
        */
        console.log("ModelD:");
        var modelD = new ModelD();
        modelD.fieldBoolean = true;
        console.log(modelD);

        console.log("Serialize ModelD:");
        var modelDSerialized: any = serialize(modelD);
        console.log(modelDSerialized);

        console.log("Unserialize ModelD:");
        const modelDUnserialized: ModelD = unserialize(modelDSerialized, ModelB) as ModelD;
        console.log(modelDUnserialized);

        console.log("Register type")
        registerType("ModelD", ModelD);
        console.log("Registered type", findTypeByName("ModelD"));

        console.log("Unserialize with @type")
        const unserializedWithType = unserialize({"@type": "ModelD"});
        console.log(unserializedWithType);

        console.log("Auto registered");
        console.log(ModelAutoRegister);
    }

    if (true) {

        for (const file of ["test-subtype", "test-type"]) {
            console.log("---", file, "---");
            const test = await import(`./${file}`);
            const result = test.test();

            if (result === true) {
                console.log("\t", "OK");
            } else {
                console.warn("\t", result);
            }
        }
    }
})();
