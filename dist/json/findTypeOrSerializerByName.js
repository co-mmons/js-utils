"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTypeOrSerializerByName = void 0;
var globalProviders_1 = require("./globalProviders");
function findTypeOrSerializerByName(name, typeProviders) {
    if (typeof name === "object") {
        if (typeof (name === null || name === void 0 ? void 0 : name["@type"]) !== "string") {
            return undefined;
        }
        name = name["@type"];
    }
    if (name) {
        if (typeProviders) {
            for (var _i = 0, typeProviders_1 = typeProviders; _i < typeProviders_1.length; _i++) {
                var provider = typeProviders_1[_i];
                if (Array.isArray(provider)) {
                    var result = findTypeOrSerializerByName(name, provider);
                    if (result) {
                        return result;
                    }
                }
                else if (provider.name === name) {
                    return provider.serializer || provider.type;
                }
            }
        }
        for (var _a = 0, globalProviders_2 = globalProviders_1.globalProviders; _a < globalProviders_2.length; _a++) {
            var provider = globalProviders_2[_a];
            if (provider.name === name) {
                return provider.serializer || provider.type;
            }
        }
    }
}
exports.findTypeOrSerializerByName = findTypeOrSerializerByName;
