import {ArraySerializer, serialize, property} from "../../json";

class Model {

    @property(String)
    property: string;
}

let serializer = new ArraySerializer(Model);
let array = [new Model(), new Model()];

let arraySerialized = serialize(array, serializer);
console.log(arraySerialized);

let arrayUnserialized = serializer.unserialize(arraySerialized);
console.log(arrayUnserialized);
