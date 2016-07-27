export class JsonSerializer {

	public serialize (object: any): any {
		return object;
	}

}

/**
 * Serializes enum as a String. By default enums are serialized as numbers.
 */
export class EnumAsStringSerializer {

	constructor (enumClass: any) {
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