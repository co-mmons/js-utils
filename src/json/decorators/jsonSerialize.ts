import {Type} from "../../core";
import {setupSerialization} from "../setupSerialization";

export function jsonSerialize() {
    return function(classType: Type) {
        setupSerialization(classType);
    }
}
