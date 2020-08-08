import {resolveForwardRef, Type} from "../../core";
import {SerializationOptions} from "../SerializationOptions";
import {Serializer} from "../Serializer";
import {ObjectSerializer} from "./ObjectSerializer";

export class SetSerializer<T> extends Serializer<T[]> {

    constructor(valueTypeOrSerializer?: Type<T> | Serializer<T>) {
        super();

        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to SetSerializer is undefined - check for class reference cycle");
        }

        if (valueTypeOrSerializer) {
            this.typeOrSerializer = resolveForwardRef(valueTypeOrSerializer);
        }
    }

    private readonly typeOrSerializer: Type | Serializer;

    serialize(value: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);

        } else if (value instanceof Set) {

            const array: any[] = [];
            const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer.instance;

            for (const i of value.values()) {
                array.push(serializer.serialize(i, options));
            }

            return array;

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as Set`);

        } else {
            return undefined;
        }
    }

    unserialize(json: any, options?: SerializationOptions): any {

        if (Array.isArray(json)) {

            const zet = new Set();
            const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : (this.typeOrSerializer && ObjectSerializer.getTypeSerializer(this.typeOrSerializer, options?.typeProviders)) || ObjectSerializer.instance;

            for (const i of json) {
                zet.add(serializer.unserialize(i, options));
            }

            return zet;

        } else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${json}" to Set`);

        } else {
            return undefined;
        }
    }
}

export namespace SetSerializer {

    export const ofAny = new SetSerializer<any>();

    export const ofString = new SetSerializer(String);

    export const ofNumber = new SetSerializer(Number);

    export const ofBoolean = new SetSerializer(Boolean);

}
