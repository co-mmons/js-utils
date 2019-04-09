import {SerializationOptions, Serializer} from "./serialization";

/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export class EnumAsStringSerializer extends Serializer {

	constructor(enumClass: any) {
		super();
		this.enumClass = enumClass;
	}

	private enumClass: any;

	public serialize(value: any, options?: SerializationOptions) {

		if (value !== undefined && value !== null) {
			return this.enumClass[value];
		} else {
			return undefined;
		}
	}

	public unserialize(value: any, options?: SerializationOptions): any {
		if (value && typeof value === "string") {
			return this.enumClass[value];
		} else {
			return undefined;
		}
	}
}
