import * as ts from "typescript";
import {PropertyConfig} from "../decorators/PropertyConfig";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node | undefined {
    return ts.visitEachChild(visitNode(node, program), childNode => visitNodeAndChildren(childNode, program, context), context);
}

function visitNode(node: ts.SourceFile, program: ts.Program): ts.SourceFile;
function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined;
function visitNode(node: ts.Node, program: ts.Program): ts.Node | undefined {
    const typeChecker = program.getTypeChecker();

    if (ts.isDecorator(node) && ts.isClassDeclaration(node.parent) && ts.isCallExpression(node.expression)) {
        const call = node.expression;

        if (ts.isIdentifier(call.expression) && call.expression.getText() === "serializable") {
            const clazz = node.parent;

            const clazzProps = [];
            for (const childNode of clazz.members) {
                if (ts.isPropertyDeclaration(childNode)) {

                    let typeName: string = undefined;
                    if (childNode.type) {
                        if (ts.isTypeReferenceNode(childNode.type)) {
                            const type = typeChecker.getTypeFromTypeNode(childNode.type);
                            const symbol = type.getSymbol();
                            if (symbol && (type.isClass() || (!type.isClassOrInterface() && symbol.name !== "__type"))) {
                                typeName = childNode.type.typeName.getText();
                            }
                        }
                    }

                    clazzProps.push(ts.createPropertyAssignment(
                        ts.createIdentifier(childNode.name.getText()),
                        typeName ? ts.createObjectLiteral([
                            ts.createPropertyAssignment(ts.createIdentifier("propertyType"), ts.createIdentifier(typeName))
                        ]) : ts.createObjectLiteral()
                    ));
                }
            }

            return ts.updateDecorator(node,
                ts.updateCall(call, call.expression, null,
                    call.arguments.concat(
                        ts.createObjectLiteral([
                            ts.createPropertyAssignment(ts.createIdentifier("properties"), ts.createObjectLiteral(clazzProps))]
                        )
                    )
                )
            );
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
