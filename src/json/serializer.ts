export interface SerializationOptions {
	notStrict?: boolean;
	disallowUndefinedOrNull?: boolean;
	ignoreErrors?: boolean;
	[propName: string]: any;
}

export abstract class Serializer {

	public serialize (object: any, options?: SerializationOptions): any {
		return object;
	}

	public abstract unserialize (json: any, options?: SerializationOptions) : any;

	protected isUndefinedOrNull (value: any) {
		return value === undefined || value === null;
	}

	protected serializeUndefinedOrNull (value: any, options?: SerializationOptions) : any {
		return value;
	}

	protected unserializeUndefinedOrNull (value: any, options?: SerializationOptions): any {
		if (options && options.disallowUndefinedOrNull) {
			throw "Undefined/null value is not allowed";
		} else {
			return value;
		}
	}

}
