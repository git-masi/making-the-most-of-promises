export function sleep<T>(time: number, val: T) {
  return new Promise<T>((res) => {
    setTimeout(() => {
      res(val);
    }, time);
  });
}

export function sleepErr<T>(
  time: number,
  val: T,
  isError: (val: T) => boolean
): Promise<T> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isError(val)) {
        rej(new Error("oops, something went wrong!"));
        return;
      }

      res(val);
    }, time);
  });
}
