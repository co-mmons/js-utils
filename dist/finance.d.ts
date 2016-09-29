/// <reference types="bignumber.js" />
import { BigNumber } from 'bignumber.js';
import { Comparable } from './core/compare';
export declare class Currency {
    constructor(code: string);
    private _code;
    readonly code: string;
    toString(): string;
    toJSON(): any;
    protected fromJSON(json: any): void;
}
export declare class Money implements Comparable<Money> {
    constructor(currency: Currency, amount: BigNumber | number);
    constructor(currency: string, amount: BigNumber | number);
    private _currency;
    readonly currency: Currency;
    private _amount;
    readonly amount: BigNumber;
    plus(amount: BigNumber | number | string): Money;
    minus(amount: BigNumber | number | string): Money;
    times(amount: BigNumber | number | string): Money;
    dividedBy(amount: BigNumber | number | string): Money;
    compareTo(money: Money | BigNumber | number): number;
}
