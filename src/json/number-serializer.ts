import {Serializer, SerializationOptions} from "./serializer";

export class NumberSerializer extends Serializer {

    static get INSTANCE () : NumberSerializer {
        return DEFAULT_INSTANCE;
    }

    public serialize (value: any, options?: SerializationOptions) : any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "number") {
            return value;
        } else if (options && options.notStrict && typeof value === "string") {
        	return parseFloat(value);
        } else if (!options || !options.ignoreErrors) {
	        throw 'Cannot serialize "' + value + " as number";
        } else {
            return undefined;
        }
	}

	public unserialize (value: any, options?: SerializationOptions) : any {
		if (typeof value === "number") {
			return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
		} else if (options && options.notStrict) {
            return parseFloat(value);
        } else if (!options || !options.ignoreErrors) {
			throw 'Cannot unserialize "' + value + " to number.";
		} else {
            return undefined;
        }
	}

}

const DEFAULT_INSTANCE = new NumberSerializer();
