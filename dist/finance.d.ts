import { BigNumber } from 'bignumber.js';
import { Comparable } from './core/compare';
export declare class Currency {
    constructor(code: string);
    private _code;
    code: string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
export declare class Money implements Comparable<Money> {
    constructor(currency: Currency, amount: BigNumber | number);
    constructor(currency: string, amount: BigNumber | number);
    private _currency;
    currency: Currency;
    private _amount;
    amount: BigNumber;
    plus(amount: BigNumber | number | string): Money;
    minus(amount: BigNumber | number | string): Money;
    times(amount: BigNumber | number | string): Money;
    dividedBy(amount: BigNumber | number | string): Money;
    compareTo(money: Money | BigNumber | number): number;
}
