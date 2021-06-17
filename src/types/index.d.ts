declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type TargetContext = '_self' | '_blank';

declare type Nullable<T> = T | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
