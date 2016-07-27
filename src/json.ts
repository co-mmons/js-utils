export function ahahaha111 () {

}

function setupJsonSerialization(constructor: Function) {

    if (!constructor["__json__useCustomSerializer"]) {
        constructor.prototype.toJSON = toJsonImpl;
    }

}

function toJsonImpl() {

    let jsonObject = new Object();

    let constructor = this.constructor;

    let decoratedProperties = constructor["__json__properties"];
    let ignoredProperties = constructor["__json__ignoredProperties"] as Array<String>;

    let properties = {};
    Object.keys(this).forEach(propertyName => {
        properties[propertyName] = true;
    });

    if (decoratedProperties) {
        for (let propertyName in decoratedProperties) {
            properties[propertyName] = true;
        }
    }

    for (let propertyName in properties) {

        if (!ignoredProperties || ignoredProperties.indexOf(propertyName) < 0) {

            let propertyInfo = decoratedProperties ? decoratedProperties[propertyName] as JsonPropertyInfo : null;
            let propertyDescriptor = Object.getOwnPropertyDescriptor(this, propertyName) as PropertyDescriptor;
            let propertyValue = propertyDescriptor && propertyDescriptor.get ? propertyDescriptor.get() : (propertyDescriptor ? propertyDescriptor.value : null);

            let jsonName = propertyInfo && propertyInfo.jsonName ? propertyInfo.jsonName : propertyName;

            jsonObject[jsonName] = propertyInfo && propertyInfo.jsonSerializer ? propertyInfo.jsonSerializer(propertyValue) : propertyValue;
        }
    }

    return jsonObject;
}

interface JsonPropertyInfo {
    jsonName:string;
    jsonSerializer:Function;
}


export function JsonProperty(jsonName?:string) {

    return function (target:any, propertyName:string, propertyDescriptor?:PropertyDescriptor) {
        setupJsonSerialization(target.constructor);

        let propertiesArray = target.constructor["__json__properties"];
        if (!propertiesArray) {
            propertiesArray = target.constructor["__json__properties"] = {};
        }

        let propertyInfo = propertiesArray[propertyName] as JsonPropertyInfo;
        if (!propertyInfo) propertyInfo = propertiesArray[propertyName] = {
            jsonName: jsonName,
            jsonSerializer: null
        } as JsonPropertyInfo;
        else propertyInfo.jsonName = jsonName;
    }
}

export function JsonIgnore(name?:String | Array<String>) {

    return function (constructor:Function) {
        setupJsonSerialization(constructor);

        let propertiesArray = constructor["__json__ignoredProperties"];
        if (!propertiesArray) {
            propertiesArray = constructor["__json__ignoredProperties"] = new Array<String>();
        }

        if (name instanceof Array) {

            name.forEach(property => {
                propertiesArray.push(property);
            });

        } else if (name) {
            propertiesArray.push(name);
        }
    }
}