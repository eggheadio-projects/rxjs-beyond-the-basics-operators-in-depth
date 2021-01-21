import { Observable } from "rxjs";
import { take, withLatestFrom, zip } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/interval";

var foo = Observable.interval(500).pipe(
  take(5),
  zip(Observable.of("H", "e", "l", "l", "o"), (_, c) => c)
)

var bar = Observable.interval(300).pipe(
  take(7),
  zip(Observable.of(0, 1, 0, 1, 0, 1, 0), (_, x) => x)
);

/*
----H----e----l----l----o|     (foo)
--0--1--0--1--0--1--0|         (bar)
  withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
----h----e----L----L----o|
*/

var combined = foo.pipe(withLatestFrom(bar, (c, n) =>
  n === 1 ? c.toUpperCase() : c.toLowerCase()
));

combined.subscribe(
  function (x) {
    console.log("next " + x);
  },
  function (err) {
    console.log("error " + err);
  },
  function () {
    console.log("done");
  }
);
