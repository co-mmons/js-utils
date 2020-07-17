import {resolveForwardRef, Type} from "../../core";
import {findTypeSerializer} from "../findTypeSerializer";
import {SerializationOptions} from "../SerializationOptions";
import {Serializer} from "../Serializer";
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

    private readonly typeOrSerializer: Type | Serializer;

    serialize(value: any, options?: SerializationOptions): any {

        if (this.isUndefinedOrNull(value)) {
            return this.serializeUndefinedOrNull(value, options);

        } else if (Array.isArray(value)) {

            const array: any[] = [];

            if (this.typeOrSerializer instanceof Serializer) {

                for (const i of value) {
                    array.push(this.typeOrSerializer.serialize(i, options));
                }

            } else {

                let serializer = this.typeOrSerializer && findTypeSerializer(this.typeOrSerializer, options?.typeProviders);
                if (!serializer) {
                    serializer = this.typeOrSerializer ? new ObjectSerializer(this.typeOrSerializer) : ObjectSerializer.instance;
                }

                for (const i of value) {
                    array.push(serializer.serialize(i, options));
                }
            }

            return array;

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot serialize "${value}" as array`);

        } else {
            return undefined;
        }
    }

    unserialize(json: any, options?: SerializationOptions): any {

        if (Array.isArray(json)) {

            const array: any[] = [];

            if (this.typeOrSerializer instanceof Serializer) {

                for (const i of json) {
                    array.push(this.typeOrSerializer.unserialize(i, options));
                }

            } else {

                let serializer = this.typeOrSerializer && findTypeSerializer(this.typeOrSerializer, options?.typeProviders);
                if (!serializer) {
                    serializer = this.typeOrSerializer ? new ObjectSerializer(this.typeOrSerializer) : ObjectSerializer.instance;
                }

                for (const i of json) {
                    array.push(serializer.unserialize(i, options));
                }
            }

            return array;

        } else if (this.isUndefinedOrNull(json)) {
            return this.unserializeUndefinedOrNull(json, options);

        } else if (!options || !options.ignoreErrors) {
            throw new Error(`Cannot unserialize "${json}" to array`);

        } else {
            return undefined;
        }
    }
}

export namespace ArraySerializer {

    export const ofAny = new ArraySerializer<any>();

    export const ofString = new ArraySerializer(String);

    export const ofNumber = new ArraySerializer(Number);

    export const ofBoolean = new ArraySerializer(Boolean);
}
