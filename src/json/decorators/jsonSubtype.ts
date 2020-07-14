import {Type} from "../../core";
import {InternalType} from "../InternalType";
import {setupSerialization} from "../setupSerialization";
import {SubtypeMatcher} from "../SubtypeMatcher";

export function jsonSubtype(supertype: Type, matcher: SubtypeMatcher);

export function jsonSubtype(supertype: Type, property: string, value: any);

export function jsonSubtype(supertype: Type, propertyOrMatcher: string | SubtypeMatcher, value?: any) {
    return function (classType: Type) {
        setupSerialization(supertype);

        const internalType = supertype as InternalType;

        const types = internalType.__jsonSubtypes = internalType.__jsonSubtypes || [];

        types.push({
            type: classType,
            property: typeof propertyOrMatcher === "string" ? propertyOrMatcher : undefined,
            value: value,
            matcher: typeof propertyOrMatcher === "function" ? propertyOrMatcher : undefined
        });
    }
}
