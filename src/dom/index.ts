export function hasClassName (element: Element, className: string) : boolean {
    return element.classList.contains(className);
}

export function getElementByClassName (element: Element, className: string) : Element {

    let nodes = element.getElementsByClassName(className);
    if (nodes.length > 0) {
        return nodes[0];
    }

    return null;
}

export function getParentElementByClassName (element: Element, className: string, topParentElementClassName?: string) : Element {

    let parent = element.parentElement;

    while (parent) {
        if (hasClassName(parent, className)) return parent;
        if (topParentElementClassName && hasClassName(parent, topParentElementClassName)) return null;
        parent = parent.parentElement
    }

    return null;
}

export function getSelfOrParentElementByClassName (element: Element | EventTarget, className: string, topParentElementClassName?: string) : Element {
    if (hasClassName(element as Element, className)) return element as Element;
    return getParentElementByClassName(element as Element, className, topParentElementClassName);
}

export function isSelfOrChildOf (element: Element | EventTarget, parent: Element, topParent?: Element) {

    if (element === parent) {
        return true;
    }

    let par = (element as Element).parentElement;
    while (par) {

        if (par === parent) {
            return true;
        }

        if (par === topParent) {
            return false;
        }

        par = par.parentElement;
    }
}
