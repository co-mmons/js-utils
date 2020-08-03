import {serialize} from "@co.mmons/js-utils/json";
import {A} from "./test-transformer-model";

export function test() {
    return serialize(new A);
}
