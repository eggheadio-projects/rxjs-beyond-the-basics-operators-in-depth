import { interval, Observable } from "rxjs";

const foo = interval(1000);

function multiplyBy(number) {
  const result = function (source) {
    return new Observable((observer) => {
      return source.subscribe({
        next(x) {
          observer.next(x * number);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });
    });
  };

  return result;
}

let bar = foo.pipe(multiplyBy(2));

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);