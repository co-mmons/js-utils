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
    constructor(currency: Currency, amount: BigNumber);
    constructor(currency: string, amount: BigNumber);
    private _currency;
    currency: Currency;
    private _amount;
    amount: BigNumber;
    compareTo(money: Money): number;
}
