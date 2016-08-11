import {Serializer, SerializationOptions} from "./index";

export class ArraySerializer extends Serializer {

    static get INSTANCE () : ArraySerializer {
        return DEFAULT_INSTANCE;
    }

    constructor (valueType?: Function | Serializer) {
    	super();
    }

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
			return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
        } else if (!options || !options.ignoreErrors) {
			throw 'Cannot unserialize "' + value + " to array.";
		} else {
            return undefined;
        }
	}
}

const DEFAULT_INSTANCE = new ArraySerializer();

export const ArrayOfString = new ArraySerializer(String);
export const ArrayOfNumber = new ArraySerializer(Number);
