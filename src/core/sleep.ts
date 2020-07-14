/**
 * Do nothing but sleep millisec.
 */
export function sleep(timeout: number): Promise<any> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}
