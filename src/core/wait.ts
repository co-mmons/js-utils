/**
 * Check condition async and re-check every 100ms (or other interval) till it explicitly returns true. 
 * If condition throws error, the promise will be rejected.
 */
export function waitTill(condition: () => boolean, interval: number = 100): Promise<void> {

    return new Promise((resolve, reject) => {

        let intervalId: number;

        let test = () => {

            try {

                if (condition() === true) {
                    
                    if (intervalId) {
                        clearInterval(intervalId);
                    }

                    resolve();

                    return true;
                }

            } catch (error) {
                
                if (intervalId) {
                    clearInterval(intervalId);
                }

                reject(error);
            }

            return false;
        };

        if (!test()) {
            setInterval(test, interval);
        }
    });
}

/**
 * Do nothing but sleep millisec.
 */
export function sleep(timeout: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
    });
}