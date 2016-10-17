export function enumValues <T> (enumClass: any) : T[] {

    var values: T[] = [];

    for (var key in enumClass) {
        values.push(enumClass[key]);
    }

    values.length = values.length / 2;

    return values;
}

export {BitFlags} from "./bit-flags";
