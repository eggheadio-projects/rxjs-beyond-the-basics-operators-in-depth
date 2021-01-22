import { Observable, of } from "rxjs";

let foo = of(1, 2, 3, 4, 5);

// foo.map
// foo.filter
// foo.merge
// foo.combineLatest

function multiplyBy(multiplier) {
  let source = this;
  let result = new Observable(function subscribe(observer) {
    source.subscribe(
      function (x) {
        observer.next(x * multiplier);
      },
      function (err) {
        observer.error(err);
      },
      function () {
        observer.complete();
      }
    );
  });
  return result;
}

Observable.prototype.multiplyBy = multiplyBy;

let bar = foo.multiplyBy(100);

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
