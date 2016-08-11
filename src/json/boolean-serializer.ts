import {Serializer, SerializationOptions} from "./index";

export class BooleanSerializer extends Serializer {

    static get INSTANCE () : BooleanSerializer {
        return DEFAULT_INSTANCE;
    }

    public serialize (value: any, options?: SerializationOptions) : any {
        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);
        } else if (typeof value === "boolean") {
            return value;
        } else if (options && options.notStrict) {
            return value ? true : false;
        } else if (!options || !options.ignoreErrors) {
        	throw 'Cannot serialize "' + value + " as boolean";
        } else {
        	return undefined;
        }
	}

	public unserialize (value: any, options?: SerializationOptions) : any {
		if (typeof value === "boolean") {
			return value;
        } else if (this.isUndefinedOrNull(value)) {
            return this.unserializeUndefinedOrNull(value, options);
		} else if (options && options.notStrict) {
            return value ? true : false;
        } else if (!options || !options.ignoreErrors) {
			throw 'Cannot unserialize "' + value + " to boolean.";
		} else {
            return undefined;
        }
	}

}

const DEFAULT_INSTANCE: BooleanSerializer = new BooleanSerializer();
