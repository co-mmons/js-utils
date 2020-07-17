import {Type} from "../../core";
import {findTypeOrSerializerByName} from "../findTypeOrSerializerByName";
import {findTypeSerializer} from "../findTypeSerializer";
import {identifyType} from "../identifyType";
import {SerializationOptions} from "../SerializationOptions";
import {Serializer} from "../Serializer";
import {TypeProvider} from "../TypeProvider";

export class ObjectSerializer extends Serializer {

    constructor(type?: Type) {
        super();

        if (type && type !== Object) {
            this.type = type;
        }
    }

    private readonly type?: Type;

    serialize(object: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(object)) {
            return object;
        } else {
            const serializer = findTypeSerializer(this.type ? this.type : identifyType(object), options?.typeProviders);
            if (serializer && serializer !== this) {
                return serializer.serialize(object, options);
            }

            if (object.toJSON) {
                return object.toJSON();
            }
        }

        return object;
    }

    unserialize(json: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(json)) {
            return json;
        }

        if (this.type) {
            const serializer = findTypeSerializer(this.type, options?.typeProviders);
            if (serializer) {
                return serializer.unserialize(json, options);
            } else {
                return this.unserializeToType(this.type, json);
            }
        }

        if (!this.type && (typeof json !== "object" || Array.isArray(json))) {
            const type = identifyType(json);
            if (type !== Object) {
                const serializer = findTypeSerializer(type, options?.typeProviders);
                if (serializer) {
                    return serializer.unserialize(json, options);
                } else {
                    return json;
                }
            } else {
                return json;
            }

        } else {

            const typeOrSerializer = findTypeOrSerializerByName(json, options?.typeProviders);

            if (typeOrSerializer instanceof Serializer) {
                return typeOrSerializer.unserialize(json, options);
            } else if (typeOrSerializer) {
                return this.unserializeToType(typeOrSerializer, json);
            }

            const niu = {};

            for (const property of Object.keys(json)) {
                niu[property] = this.unserialize(json[property], options);
            }

            return niu;
        }
    }

    private unserializeToType(type: Type, json: any) {
        if (type.prototype["fromJSON"]) {
            const instance = Object.create(type.prototype);
            instance.fromJSON(json);
            return instance;
        } else if (type["fromJSON"]) {
            return type["fromJSON"](json);
        } else if (type !== Object) {
            return new (type as any)(json);
        }
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
