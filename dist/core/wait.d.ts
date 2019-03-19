/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true.
 * If condition throws error, the promise will be rejected.
 */
export declare function waitTill(condition: () => boolean, interval?: number, timeout?: number): Promise<void>;
/**
 * Do nothing but sleep millisec.
 */
export declare function sleep(timeout: number): Promise<any>;
