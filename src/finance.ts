import {Property} from './json';
import BigNumber from 'bignumber.js';
import {Comparable} from './core/compare';
import {Currency} from './intl/currency';

export {Currency} from './intl/currency';
export {BigNumber} from 'bignumber.js';

function toBigNumber (value: number | BigNumber | string | any): BigNumber {

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

	constructor (currency: Currency, amount: BigNumber | number);

	constructor (currency: string, amount: BigNumber | number);

	constructor (currencyOrPrototype: Currency | string | any, amount?: number | BigNumber | string | number) {

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

	get currency (): Currency {
		return this._currency;
	}

	@Property(BigNumber, 'amount')
	private _amount: BigNumber;

	get amount (): BigNumber {
		return this._amount;
	}

	plus (amount: BigNumber | number | string): Money {
        return new Money(this._currency, this._amount.plus(amount));
	}

	minus (amount: BigNumber | number | string): Money {
        return new Money(this._currency, this._amount.minus(amount));
	}

	times (amount: BigNumber | number | string): Money {
        return new Money(this._currency, this._amount.times(amount));
	}

	dividedBy (amount: BigNumber | number | string): Money {
        return new Money(this._currency, this._amount.dividedBy(amount));
	}

	compareTo (money: Money | BigNumber | number): number {
		if (typeof money === "number") return this._amount.comparedTo(money);
		else if (money instanceof BigNumber) return this._amount.comparedTo(money);
		else if (money) return this._amount.comparedTo(money.amount);
		else throw "Cannot compare empty value";
	}
}
