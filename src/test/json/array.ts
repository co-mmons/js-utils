import {ArraySerializer} from "../../json/array-serializer";
import {Property, serialize, unserialize} from "../../json";

class Model {
    @Property(String)
    property: string;
}

let serializer = new ArraySerializer(Model);
let array = [new Model(), new Model()];

let arraySerialized = serialize(array, serializer);
console.log(arraySerialized);

let arrayUnserialized = serializer.unserialize(arraySerialized);
console.log(arrayUnserialized);
