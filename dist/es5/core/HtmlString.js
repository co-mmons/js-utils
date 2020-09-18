"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlString = void 0;
var tslib_1 = require("tslib");
var HtmlString = /** @class */ (function (_super) {
    tslib_1.__extends(HtmlString, _super);
    function HtmlString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlString.fromJSON = function (json) {
        if (typeof json === "string") {
            return new HtmlString(json);
        }
        else if (typeof json === "object" && json["@type"] === HtmlString.jsonTypeName && typeof json === "string") {
            return new HtmlString(json["value"]);
        }
        else {
            throw new Error("Cannot unserialize " + json + " to HtmlString");
        }
    };
    HtmlString.prototype.toJSON = function () {
        return { "@type": "HtmlString", value: _super.prototype.toString.call(this) };
    };
    HtmlString.jsonTypeName = "HtmlString";
    return HtmlString;
}(String));
exports.HtmlString = HtmlString;
//# sourceMappingURL=HtmlString.js.map