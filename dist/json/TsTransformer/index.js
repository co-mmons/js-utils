"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function transformer(program) {
    return function (context) { return function (file) { return visitNodeAndChildren(file, program, context); }; };
}
exports.default = transformer;
function visitNodeAndChildren(node, program, context) {
    return ts.visitEachChild(visitNode(node, program), function (childNode) { return visitNodeAndChildren(childNode, program, context); }, context);
}
function visitNode(node, program) {
    var typeChecker = program.getTypeChecker();
    if (ts.isDecorator(node) && ts.isClassDeclaration(node.parent) && ts.isCallExpression(node.expression)) {
        var call = node.expression;
        if (ts.isIdentifier(call.expression) && call.expression.getText() === "serializable") {
            var clazz = node.parent;
            var clazzProps = [];
            for (var _i = 0, _a = clazz.members; _i < _a.length; _i++) {
                var childNode = _a[_i];
                if (ts.isPropertyDeclaration(childNode)) {
                    var typeName = undefined;
                    if (childNode.type) {
                        if (ts.isTypeReferenceNode(childNode.type)) {
                            var type = typeChecker.getTypeFromTypeNode(childNode.type);
                            var symbol = type.getSymbol();
                            if (symbol && (type.isClass() || type.isClassOrInterface())) {
                                typeName = symbol.name;
                            }
                        }
                    }
                    clazzProps.push(ts.createPropertyAssignment(ts.createIdentifier(childNode.name.getText()), typeName ? ts.createObjectLiteral([
                        ts.createPropertyAssignment(ts.createIdentifier("propertyType"), ts.createIdentifier(typeName))
                    ]) : ts.createObjectLiteral()));
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
