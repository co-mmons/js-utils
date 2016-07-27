"use strict";
function ahahaha111() {
}
exports.ahahaha111 = ahahaha111;
function setupJsonSerialization(constructor) {
    if (!constructor["__json__useCustomSerializer"]) {
        constructor.prototype.toJSON = toJsonImpl;
    }
}
function toJsonImpl() {
    var jsonObject = new Object();
    var constructor = this.constructor;
    var decoratedProperties = constructor["__json__properties"];
    var ignoredProperties = constructor["__json__ignoredProperties"];
    var properties = {};
    Object.keys(this).forEach(function (propertyName) {
        properties[propertyName] = true;
    });
    if (decoratedProperties) {
        for (var propertyName in decoratedProperties) {
            properties[propertyName] = true;
        }
    }
    for (var propertyName in properties) {
        if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {
            var propertyInfo = decoratedProperties ? decoratedProperties[propertyName] : null;
            var propertyDescriptor = Object.getOwnPropertyDescriptor(this, propertyName);
            var propertyValue = propertyDescriptor && propertyDescriptor.get ? propertyDescriptor.get() : (propertyDescriptor ? propertyDescriptor.value : null);
            var jsonName = propertyInfo && propertyInfo.jsonName ? propertyInfo.jsonName : propertyName;
            jsonObject[jsonName] = propertyInfo && propertyInfo.jsonSerializer ? propertyInfo.jsonSerializer(propertyValue) : propertyValue;
        }
    }
    return jsonObject;
}
function JsonProperty(jsonName) {
    return function (target, propertyName, propertyDescriptor) {
        setupJsonSerialization(target.constructor);
        var propertiesArray = target.constructor["__json__properties"];
        if (!propertiesArray) {
            propertiesArray = target.constructor["__json__properties"] = {};
        }
        var propertyInfo = propertiesArray[propertyName];
        if (!propertyInfo)
            propertyInfo = propertiesArray[propertyName] = {
                jsonName: jsonName,
                jsonSerializer: null
            };
        else
            propertyInfo.jsonName = jsonName;
    };
}
exports.JsonProperty = JsonProperty;
function JsonIgnore(name) {
    return function (constructor) {
        setupJsonSerialization(constructor);
        var propertiesArray = constructor["__json__ignoredProperties"];
        if (!propertiesArray) {
            propertiesArray = constructor["__json__ignoredProperties"] = new Array();
        }
        if (name instanceof Array) {
            name.forEach(function (property) {
                propertiesArray.push(property);
            });
        }
        else if (name) {
            propertiesArray.push(name);
        }
    };
}
exports.JsonIgnore = JsonIgnore;
