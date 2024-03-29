/**
 * Do nothing but sleep millisec.
 */
export function sleep(timeout: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
}
