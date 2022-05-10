"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalProviders = void 0;
const TimeZoneDate_1 = require("../core/TimeZoneDate");
const LocalDate_1 = require("../core/LocalDate");
const NoTimeDate_1 = require("../core/NoTimeDate");
const BooleanSerializer_1 = require("./serializers/BooleanSerializer");
const DateSerializer_1 = require("./serializers/DateSerializer");
const NumberSerializer_1 = require("./serializers/NumberSerializer");
const StringSerializer_1 = require("./serializers/StringSerializer");
exports.globalProviders = [
    { type: Boolean, serializer: BooleanSerializer_1.BooleanSerializer.instance },
    { type: Number, serializer: NumberSerializer_1.NumberSerializer.instance },
    { type: Date, name: "Date", serializer: DateSerializer_1.DateSerializer.instance },
    { type: NoTimeDate_1.NoTimeDate, name: NoTimeDate_1.NoTimeDate.jsonTypeName, serializer: DateSerializer_1.DateSerializer.instance },
    { type: LocalDate_1.LocalDate, name: LocalDate_1.LocalDate.jsonTypeName, serializer: DateSerializer_1.DateSerializer.instance },
    { type: TimeZoneDate_1.TimeZoneDate, name: TimeZoneDate_1.TimeZoneDate.jsonTypeName, serializer: DateSerializer_1.DateSerializer.instance },
    { type: String, serializer: StringSerializer_1.StringSerializer.instance }
];
//# sourceMappingURL=globalProviders.js.map