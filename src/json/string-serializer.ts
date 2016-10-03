import {Serializer, SerializationOptions} from "./serializer";

export class StringSerializer extends Serializer {

    static get INSTANCE () : StringSerializer {
        return DEFAULT_INSTANCE;
    }

    public serialize (value: any, options?: SerializationOptions) : any {
        if (this.isUndefinedOrNull(value)) {
	        return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "string") {
            return value;
        } else if (options && options.notStrict) {
	        return value + "";
        } else if (!options || !options.ignoreErrors) {
	        throw 'Cannot serialize "' + value + " as string";
        } else {
	        return undefined;
        }
	}

	public unserialize (value: any, options?: SerializationOptions) : any {
		if (typeof value === "string") {
			return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
		} else if (options && options.notStrict) {
            return value + "";
        } else if (!options || !options.ignoreErrors) {
			throw 'Cannot unserialize "' + value + " to string.";
		} else {
            return undefined;
        }
	}

}

const DEFAULT_INSTANCE = new StringSerializer();
