import {Serializer, SerializationOptions, unserialize, serialize} from "./index";

export class ArraySerializer extends Serializer {

    constructor (valueType?: Function | Serializer) {
    	super();
        this.valueType = valueType;
    }

    private valueType: Function | Serializer;

    public serialize (value: any, options?: SerializationOptions) : any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (Array.isArray(value)) {
            return value;
        } else if (!options || !options.ignoreErrors) {
	        throw 'Cannot serialize "' + value + " as array";
        } else {
            return undefined;
        }
	}

	public unserialize (value: any, options?: SerializationOptions) : any {

        if (Array.isArray(value)) {

            if (this.valueType) {
                let array: any[] = [];

                if (this.valueType instanceof Serializer) {

                    for (let i of value) {
                        array.push((this.valueType as Serializer).unserialize(i));
                    }

                } else {
                    for (let i of value) {
                        array.push(unserialize(i, this.valueType as Function));
                    }
                }

                return array;

            } else {
			    return value;
            }

        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (!options || !options.ignoreErrors) {
			throw 'Cannot unserialize "' + value + " to array.";
		} else {
            return undefined;
        }
	}
}

export const ArrayOfAny = new ArraySerializer();
export const ArrayOfString = new ArraySerializer(String);
export const ArrayOfNumber = new ArraySerializer(Number);
