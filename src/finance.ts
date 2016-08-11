import {Property} from './json';
import {BigNumber} from 'bignumber.js';
import {Comparable} from './core/compare';

export class Currency {

    constructor(code: string);

    constructor(codeOrPrototype: string | any) {

        if (typeof codeOrPrototype === 'string') {
            this._code = codeOrPrototype;
        } else if (codeOrPrototype['code'] && typeof codeOrPrototype['code'] === 'string') {
            this._code = codeOrPrototype['code'];
        } else {
            throw 'Currency code must be given in order to create Currency instance';
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

        if (typeof json === 'string') {
            this._code = json;
        } else if (json && typeof json['code'] === 'string') {
            this._code = json['code'];
        } else {
            throw 'Cannot unserialize "' + json + '" to Currency instance';
        }
    }
}

function toBigNumber(value: number | BigNumber | string | any): BigNumber {

    if (value instanceof BigNumber) {
        return value;
    } else if (typeof value === 'number') {
        return new BigNumber(value);
    } else if (typeof value === 'string') {
        return new BigNumber(value);
    } else {
        throw 'Given value: "' + value + '" cannot be converted to BigNumber.';
    }
}

export class Money implements Comparable<Money> {

    constructor(currency: Currency, amount: BigNumber);

    constructor(currency: string, amount: BigNumber);

    constructor(currencyOrPrototype: Currency | string | any, amount?: number | BigNumber | string) {

        if (currencyOrPrototype instanceof Currency || typeof currencyOrPrototype === "string") {
            this._currency = currencyOrPrototype instanceof Currency ? currencyOrPrototype : new Currency(currencyOrPrototype);
            this._amount = toBigNumber(amount);

        } else if (currencyOrPrototype) {
            this._amount = toBigNumber(currencyOrPrototype['amount']);
            this._currency = currencyOrPrototype['currency'] instanceof Currency ? currencyOrPrototype['amount'] : new Currency(currencyOrPrototype['currency']);
        }
    }

    @Property(Currency, 'currency')
    private _currency: Currency;

    get currency(): Currency {
        return this._currency;
    }

    @Property(BigNumber, 'amount')
    private _amount: BigNumber;

    get amount(): BigNumber {
        return this._amount;
    }

    compareTo (money: Money): number {
        return this._amount.comparedTo(money.amount);
    }
}
