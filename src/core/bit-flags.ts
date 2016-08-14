export class BitFlags {

	constructor (value?: number) {
		this._value = value !== undefined ? value : 0;
	}

	protected _value: number;

	get value () : number {
		return this._value;
	}

	has (flag: number) : boolean {
		return (this._value & flag) == flag;
	}

	not (flag: number) : boolean {
		return this.has(flag) == false;
	}

	add (flag: number) : BitFlags {
		return new BitFlags(this._value | flag);
	}

	remove (flag: number) : BitFlags {
		return new BitFlags(this._value & ~flag);
	}

	toggle (flag: number) : BitFlags {
		return new BitFlags(this._value ^ flag);
	}
}

export class BitFlagsMutable extends BitFlags {

    constructor (value?: number) {
		super(value);
	}

	add (flag: number) : BitFlagsMutable {
        this._value |= flag;
		return this;
	}

	remove (flag: number) : BitFlagsMutable {
        this._value &= ~flag;
		return this;
	}

	toggle (flag: number) : BitFlagsMutable {
        this._value ^= flag;
		return this;
	}

}
