import {JsonSerializer} from "./json";

/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export class EnumAsStringSerializer extends JsonSerializer {

	constructor (enumClass: any) {
		super();
		this.enumClass = enumClass;
	}

	private enumClass: any;

	public serialize (enumValue: any) {

		if (enumValue) {
			return this.enumClass[enumValue];
		} else {
			return null;
		}
	}
}