"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var json_1 = require('./json');
var bignumber_js_1 = require('bignumber.js');
var currency_1 = require('./intl/currency');
var currency_2 = require('./intl/currency');
exports.Currency = currency_2.Currency;
var bignumber_js_2 = require('bignumber.js');
exports.BigNumber = bignumber_js_2.BigNumber;
function toBigNumber(value) {
    if (value instanceof bignumber_js_1.default) {
        return value;
    }
    else if (typeof value === 'number') {
        return new bignumber_js_1.default(value);
    }
    else if (typeof value === 'string') {
        return new bignumber_js_1.default(value);
    }
    else {
        throw 'Given value: "' + value + '" cannot be converted to BigNumber.';
    }
}
var Money = (function () {
    function Money(currencyOrPrototype, amount) {
        if (currencyOrPrototype instanceof currency_1.Currency || typeof currencyOrPrototype === "string") {
            this._currency = currencyOrPrototype instanceof currency_1.Currency ? currencyOrPrototype : new currency_1.Currency(currencyOrPrototype);
            this._amount = toBigNumber(amount);
        }
        else if (currencyOrPrototype) {
            this._amount = toBigNumber(currencyOrPrototype['amount']);
            this._currency = currencyOrPrototype['currency'] instanceof currency_1.Currency ? currencyOrPrototype['amount'] : new currency_1.Currency(currencyOrPrototype['currency']);
        }
    }
    Object.defineProperty(Money.prototype, "currency", {
        get: function () {
            return this._currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Money.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        enumerable: true,
        configurable: true
    });
    Money.prototype.plus = function (amount) {
        return new Money(this._currency, this._amount.plus(amount));
    };
    Money.prototype.minus = function (amount) {
        return new Money(this._currency, this._amount.minus(amount));
    };
    Money.prototype.times = function (amount) {
        return new Money(this._currency, this._amount.times(amount));
    };
    Money.prototype.dividedBy = function (amount) {
        return new Money(this._currency, this._amount.dividedBy(amount));
    };
    Money.prototype.compareTo = function (money) {
        if (typeof money === "number")
            return this._amount.comparedTo(money);
        else if (money instanceof bignumber_js_1.default)
            return this._amount.comparedTo(money);
        else if (money)
            return this._amount.comparedTo(money.amount);
        else
            throw "Cannot compare empty value";
    };
    __decorate([
        json_1.Property(currency_1.Currency, 'currency'), 
        __metadata('design:type', currency_1.Currency)
    ], Money.prototype, "_currency", void 0);
    __decorate([
        json_1.Property(bignumber_js_1.default, 'amount'), 
        __metadata('design:type', bignumber_js_1.default)
    ], Money.prototype, "_amount", void 0);
    return Money;
}());
exports.Money = Money;
//# sourceMappingURL=finance.js.map