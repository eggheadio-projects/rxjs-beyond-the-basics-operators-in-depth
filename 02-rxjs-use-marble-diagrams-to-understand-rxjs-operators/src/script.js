import { interval, Observable } from "rxjs";

let foo = interval(1000);

/*

foo: ---0---1---2---3--...
        multiplyBy(2)
bar: ---0---2---4---6--...

*/

function multiplyBy(multiplier) {
  let source = this;
  let result = new Observable(function subscribe(observer) {
    source.subscribe(
      function (x) { observer.next(x * multiplier); },
      function (err) { observer.error(err); },
      function () { observer.complete(); }
    );
  });
  return result;
}

Observable.prototype.multiplyBy = multiplyBy;

let bar = foo.multiplyBy(2);

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);