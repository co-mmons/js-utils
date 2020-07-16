export function getPrototypesTree(thiz) {
    var types = [];
    var prototype = Object.getPrototypeOf(thiz);
    while (prototype.constructor !== Object) {
        types.push(prototype);
        prototype = Object.getPrototypeOf(prototype);
    }
    return types;
}
//# sourceMappingURL=getPrototypesTree.js.map