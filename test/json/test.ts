import {ModelA, ModelB, ModelC} from "./model";
import {serialize, unserialize} from "../../src/json";

var model: ModelB = new ModelB();
model.fieldString = "aaaa";
model.fieldNumber = 121212;
model.fieldNumberAsString = 232323;
model.fieldBoolean = true;
model.baseFieldString = "bbbb";
model.fieldArray = ["asas"];

console.log("ModelB:");
console.log(model);

var modelSerialized: any = serialize(model);
console.log("Serialize ModelB:");
console.log(modelSerialized);

var modelUnserialized: ModelB = unserialize(modelSerialized, ModelB) as ModelB;
console.log("Unserialize ModelB:");
console.log(modelUnserialized);

var modelC = new ModelC(model) ;
console.log("ModelC:");
console.log(modelC);

var modelCSerialized: any = serialize(modelC);
console.log("Serialize ModelC:");
console.log(modelCSerialized);

var modelCUnserialized: ModelC = unserialize(modelCSerialized, ModelC) as ModelC;
console.log("Unserialize ModelC:");
console.log(modelCUnserialized);
