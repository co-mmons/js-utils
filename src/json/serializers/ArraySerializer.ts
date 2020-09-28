import {resolveForwardRef, Type} from "../../core";
import {SerializationOptions} from "../SerializationOptions";
import {serializeImpl} from "../serializeImpl";
import {Serializer} from "../Serializer";
import {unserialize} from "../unserialize";
import {unserializeImpl} from "../unserializeImpl";
import {ObjectSerializer} from "./ObjectSerializer";

export class ArraySerializer<T> extends Serializer<T[]> {

    constructor(valueTypeOrSerializer?: Type<T> | Serializer<T>) {
        super();

        if (arguments.length == 1 && !valueTypeOrSerializer) {
            throw new Error("Value type passed to Json Array Serializer is undefined - check, whether class reference cycle");
        }

        if (valueTypeOrSerializer) {
            this.typeOrSerializer = resolveForwardRef(valueTypeOrSerializer);
        }
    }

    readonly typeOrSerializer: Type | Serializer;

    serialize(value: any, options?: SerializationOptions): any {
        const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : undefined;

        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);

        } else if (Array.isArray(value)) {

            const array: any[] = [];

            for (const i of value) {
                array.push(serializer ? serializer.serialize(i, options) : serializeImpl(i, this.typeOrSerializer as any, options));
            }

            return array;

        } else if (serializer) {
            return serializer.serialize(value, options);

        } else {
            return serializeImpl(value, this.typeOrSerializer as any, options);
        }
    }

    unserialize(json: any, options?: SerializationOptions): any {
        const serializer = this.typeOrSerializer instanceof Serializer ? this.typeOrSerializer : undefined;

        if (this.isUndefinedOrNull(json)) {
            return this.serializeUndefinedOrNull(json, options);

        } else if (Array.isArray(json)) {
            const array: any[] = [];

            for (const i of json) {
                array.push(serializer ? serializer.unserialize(i, options) : unserializeImpl(i, this.typeOrSerializer as any, options));
            }

            return array;

        } else if (serializer) {
            return serializer.unserialize(json, options);

        } else {
            return unserialize(json, this.typeOrSerializer as any, options);
        }
    }
}

export namespace ArraySerializer {

    export const ofAny = new ArraySerializer<any>();

    export const ofString = new ArraySerializer(String);

    export const ofNumber = new ArraySerializer(Number);

    export const ofBoolean = new ArraySerializer(Boolean);
}
