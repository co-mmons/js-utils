/**
 * Copy of https://github.com/jkroso/prefix
 */

const style = typeof document != 'undefined' ? document.createElement('p').style : {};
const prefixes: string[] = ["O", "ms", "Moz", "Webkit"];
const upper = /([A-Z])/g;
const memo = {};

/**
 * prefix `key`
 *
 *   prefix("transform") // => WebkitTransform
 *
 * @param {String} key
 * @return {String}
 */
function prefix(key): string {

    // camel case
    key = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

    // without prefix
    if (style[key] !== undefined) return key;

    // with prefix
    let prefixed = key.charAt(0).toUpperCase() + key.slice(1);
    
    let i = prefixes.length;
    while (i--) {
        let name = prefixes[i] + prefixed;
        if (style[name] !== undefined) return name;
    }

    return key;
}

/**
 * Memoized version of `prefix`
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
export function cssVendorPrefix(key): string {
    return key in memo ? memo[key] : memo[key] = prefix(key);
}

/**
 * Create a dashed prefix
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
export function cssVendorPrefixDashed(key): string {
    key = cssVendorPrefix(key);
    if (upper.test(key)) {
        key = "-" + key.replace(upper, "-$1");
        upper.lastIndex = 0;
    }
    return key.toLowerCase();
}