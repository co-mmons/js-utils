import {findTypeOrSerializerByName} from "../findTypeOrSerializerByName";
import {findTypeSerializer} from "../findTypeSerializer";
import {identifyType} from "../identifyType";
import {SerializationOptions} from "../SerializationOptions";
import {Serializer} from "../Serializer";

export class ObjectSerializer extends Serializer {

    serialize(object: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(object)) {
            return object;
        } else {
            const serializer = findTypeSerializer(identifyType(object));
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

        } else if (typeof json !== "object") {

            const type = identifyType(json);
            if (type !== Object) {
                const serializer = findTypeSerializer(type);
                if (serializer) {
                    return serializer.unserialize(json, options);
                } else {
                    return json;
                }
            } else {
                return json;
            }

        } else {

            const typeOrSerializer = findTypeOrSerializerByName(json);

            if (typeOrSerializer instanceof Serializer) {
                return typeOrSerializer.unserialize(json, options);

            } else if (typeOrSerializer) {
                if (typeOrSerializer.prototype["fromJSON"]) {
                    const instance = Object.create(typeOrSerializer.prototype);
                    instance.fromJSON(json);
                    return instance;
                } else if (typeOrSerializer["fromJSON"]) {
                    return typeOrSerializer["fromJSON"](json);
                } else if (typeOrSerializer !== Object) {
                    return new (typeOrSerializer as any)(json);
                }
            }

            const niu = {};

            for (const property of Object.keys(json)) {
                niu[property] = this.unserialize(json[property]);
            }

            return niu;
        }
    }
}

export namespace ObjectSerializer {
    export const instance = new ObjectSerializer();
}
