import * as ts from "typescript";
export default function transformer(program) {
    return (context) => (file) => {
        return visitNodeAndChildren(file, program, context);
    };
}
function visitNodeAndChildren(node, program, context) {
    return ts.visitEachChild(visitNode(node, program), childNode => visitNodeAndChildren(childNode, program, context), context);
}
function visitNode(node, program) {
    var _a;
    const typeChecker = program.getTypeChecker();
    if (ts.isDecorator(node) && ts.isClassDeclaration(node.parent) && ts.isCallExpression(node.expression)) {
        const call = node.expression;
        if (ts.isIdentifier(call.expression) && call.expression.getText() === "serializable") {
            const clazzProps = [];
            const clazz = node.parent;
            // for (const property of typeChecker.getPropertiesOfType(typeChecker.getTypeAtLocation(node.parent))) {
            //     console.log(property.name);
            //     // clazzProps.push(ts.createPropertyAssignment(ts.createIdentifier(property.name), ts.createObjectLiteral()));
            // }
            for (const childNode of clazz.members) {
                if (ts.isPropertyDeclaration(childNode)) {
                    if (!childNode.type || ((_a = childNode.modifiers) === null || _a === void 0 ? void 0 : _a.find(m => m.kind === ts.SyntaxKind.StaticKeyword))) {
                        continue;
                    }
                    //
                    // let typeName: any = undefined;
                    // const type = typeChecker.getTypeAtLocation(childNode);
                    //
                    // if (type) {
                    //     if (type && type.isClassOrInterface()) {
                    //         const symbol = type.getSymbol();
                    //         if (symbol?.name === "BigNumber") {
                    //         } else if (symbol && symbol.valueDeclaration && type.isClassOrInterface()) {
                    //         }
                    //     }
                    // }
                    clazzProps.push(ts.createPropertyAssignment(ts.createIdentifier(childNode.name.getText()), ts.createObjectLiteral()));
                }
            }
            return ts.updateDecorator(node, ts.updateCall(call, call.expression, null, call.arguments.concat(ts.createObjectLiteral([
                ts.createPropertyAssignment(ts.createIdentifier("properties"), ts.createObjectLiteral(clazzProps))
            ]))));
        }
    }
    // if (isKeysImportExpression(node)) {
    //     return;
    // }
    // if (!isKeysCallExpression(node, typeChecker)) {
    //     return node;
    // }
    // if (!node.typeArguments) {
    //     return ts.createArrayLiteral([]);
    // }
    // const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    // const properties = typeChecker.getPropertiesOfType(type);
    // return ts.createArrayLiteral(properties.map(property => ts.createLiteral(property.name)));
    return node;
}
