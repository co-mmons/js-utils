export class Currency {

	constructor(code: string);

	constructor(codeOrPrototype: string | any) {

		if (typeof codeOrPrototype === "string") {
			this._code = codeOrPrototype;
		} else if (codeOrPrototype["code"] && typeof codeOrPrototype["code"] === "string") {
			this._code = codeOrPrototype["code"];
		} else {
			throw "Currency code must be given in order to create Currency instance";
		}
	}

	private _code: string;

	get code(): string {
		return this._code;
	}

	toString(): string {
		return this._code;
	}

	toJSON(): any {
		return this._code;
	}

	protected fromJSON(json: any) {

		if (typeof json === "string") {
			this._code = json;
		} else if (json && typeof json["code"] === "string") {
			this._code = json["code"];
		} else {
			throw "Cannot unserialize '" + json + "' to Currency instance";
		}
	}
}
