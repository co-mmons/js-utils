"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalProviders = void 0;
const TimeZoneDate_1 = require("../core/TimeZoneDate");
const serializers_1 = require("./serializers");
exports.globalProviders = [
    { type: Boolean, serializer: serializers_1.BooleanSerializer.instance },
    { type: Number, serializer: serializers_1.NumberSerializer.instance },
    { type: Date, name: "Date", serializer: serializers_1.DateSerializer.instance },
    { type: TimeZoneDate_1.TimeZoneDate, name: "TimeZoneDate", serializer: serializers_1.DateSerializer.instance },
    { type: Array, serializer: serializers_1.ArraySerializer.ofAny },
    { type: String, serializer: serializers_1.StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map