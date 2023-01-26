declare type AnyFunc = (...arg: any) => any;
declare type LastFnReturnType<F extends Array<AnyFunc>, Else = never> = F extends [...any[], (...arg: any) => infer R] ? R : Else;
declare type PipeArgs<F extends AnyFunc[], Acc extends AnyFunc[] = []> = F extends [(...args: infer A) => infer B] ? [...Acc, (...args: A) => B] : F extends [(...args: infer A) => any, ...infer Tail] ? Tail extends [(arg: infer B) => any, ...any[]] ? PipeArgs<Tail, [...Acc, (...args: A) => B]> : Acc : Acc;
export declare function pipe<FirstFn extends AnyFunc, F extends AnyFunc[]>(arg: Parameters<FirstFn>[0], firstFn: FirstFn, ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>): LastFnReturnType<F, ReturnType<FirstFn>>;
export {};
