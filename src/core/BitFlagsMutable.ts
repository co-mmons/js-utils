import {BitFlags} from "./BitFlags";

export class BitFlagsMutable extends BitFlags {

    constructor (value?: number) {
		super(value);
	}

	add(flag: number) : BitFlagsMutable {
        this._value |= flag;
		return this;
	}

	remove(flag: number) : BitFlagsMutable {
        this._value &= ~flag;
		return this;
	}

	toggle(flag: number) : BitFlagsMutable {
        this._value ^= flag;
		return this;
	}
}
