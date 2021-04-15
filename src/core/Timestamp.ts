export interface Timestamp {
    toMillis(): number;
    toDate(): Date;
}

export default Timestamp;

declare global {
    interface Date extends Timestamp {
    }
}

Date.prototype.toMillis = function() {
    return this.getTime();
}

Date.prototype.toDate = function() {
    return new Date(this.getTime());
}
