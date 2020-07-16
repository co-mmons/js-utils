import {SerializationOptions} from "../SerializationOptions";
import {Serializer} from "../Serializer";

/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export class EnumAsStringSerializer extends Serializer {

	constructor(enumClass: any) {
		super();
		this.enumClass = enumClass;
	}

	private readonly enumClass: any;

	serialize(value: any, options?: SerializationOptions) {

		if (!this.isUndefinedOrNull(value)) {
			return this.enumClass[value];
		} else {
			return undefined;
		}
	}

	unserialize(value: any, options?: SerializationOptions): any {
		if (value && typeof value === "string") {
			return this.enumClass[value];
		} else {
			return undefined;
		}
	}
}
