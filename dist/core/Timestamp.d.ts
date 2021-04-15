export interface Timestamp {
    toMillis(): number;
    toDate(): Date;
}
export default Timestamp;
declare global {
    interface Date extends Timestamp {
    }
}
