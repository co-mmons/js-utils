import {Type} from "../../core";
import {findTypeOrSerializerByName} from "../findTypeOrSerializerByName";
import {findTypeSerializer} from "../findTypeSerializer";
import {identifyType} from "../identifyType";
import {SerializationOptions} from "../SerializationOptions";
import {serializeImpl} from "../serializeImpl";
import {Serializer} from "../Serializer";
import {TypeProvider} from "../TypeProvider";
import {unserializeImpl} from "../unserializeImpl";

/**
 * Basic serializer.
 */
export class ObjectSerializer extends Serializer {

    constructor(type?: Type) {
        super();

        if (type && type !== Object && type !== Array) {
            this.type = type;
        }
    }

    private readonly type?: Type;

    serialize(object: any, options?: SerializationOptions): any {
        return serializeImpl(object, this.type, options);
    }

    unserialize(json: any, options?: SerializationOptions): any {
        return unserializeImpl(json, (this.type && findTypeSerializer(this.type, options?.typeProviders)) || this.type, options);
    }
}

export namespace ObjectSerializer {
    export const instance = new ObjectSerializer();

    export function getTypeSerializer(type: Type, typeProviders?: TypeProvider[]) {
        const serializer = findTypeSerializer(type, typeProviders);
        if (serializer) {
            return serializer;
        } else {
            return new ObjectSerializer(type);
        }
    }
}
