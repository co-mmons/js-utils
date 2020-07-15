import {Type} from "../../core";
import {setupSerialization} from "../setupSerialization";

export function jsonSerializable() {
    return function(classType: Type) {
        setupSerialization(classType);
    }
}
