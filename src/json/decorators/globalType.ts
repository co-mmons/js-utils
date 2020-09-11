import {Type} from "../../core";
import {JsonTypeName} from "../JsonTypeName";
import {registerGlobalProvider, RegisterGlobalProviderOptions} from "../registerGlobalProvider";

export function globalType(options?: RegisterGlobalProviderOptions) {
    return function(classType: Type & JsonTypeName) {
        registerGlobalProvider({name: classType.jsonTypeName, type: classType}, options);
    }
}
