import { Observable } from "rxjs";
import "rxjs/add/observable/interval";

var foo = Observable.interval(1000);

/*

foo: ---0---1---2---3--...
        multiplyBy(2)
bar: ---0---2---4---6--...

*/

function multiplyBy(multiplier) {
  var source = this;
  var result = Observable.create(function subscribe(observer) {
    source.subscribe(
      function (x) { observer.next(x * multiplier); },
      function (err) { observer.error(err); },
      function () { observer.complete(); }
    );
  });
  return result;
}

Observable.prototype.multiplyBy = multiplyBy;

var bar = foo.multiplyBy(2);

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);