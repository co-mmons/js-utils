import {InternalType} from "../InternalType";
import {setupSerialization} from "../setupSerialization";

export function ignore() {
    return function(classPrototype: any, propertyName: string, propertyDescriptor?: PropertyDescriptor) {

        const internalType = classPrototype.constructor as InternalType;
        setupSerialization(internalType);

        const properties = internalType.__jsonIgnoredProperties = (internalType.hasOwnProperty("__jsonIgnoredProperties") && internalType.__jsonIgnoredProperties) || [];
        properties.push(propertyName);
    }
}
