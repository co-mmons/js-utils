import { AssignableType } from "../core";
export declare function findTypeByName(name: string | {
    "@type": string;
}): AssignableType<any>;
