export declare function hasClassName(element: Element, className: string): boolean;
export declare function getElementByClassName(element: Element, className: string): Element;
export declare function getParentElementByClassName(element: Element, className: string, topParentElementClassName?: string): Element;
export declare function getSelfOrParentElementByClassName(element: Element | EventTarget, className: string, topParentElementClassName?: string): Element;
export declare function isSelfOrChildOf(element: Element | EventTarget, parent: Element, topParent?: Element): boolean;
