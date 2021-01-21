//WIP

import { Observable } from "rxjs";
import { take, withLatestFrom } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/interval";

var foo = Observable.interval(500);
var takeFive = foo.pipe(take(5));
var zipFive = Observable.zip(
  takeFive,
  (Observable.of("H", "e", "l", "l", "o"), (_, c) => c)
);

var bar = Observable.interval(300);
var takeSeven = bar.pipe(take(7));
var zipSeven = Observable.zip(
  takeSeven,
  (Observable.of(0, 1, 0, 1, 0, 1, 0), (_, x) => x)
);

/*
----H----e----l----l----o|     (foo)
--0--1--0--1--0--1--0|         (bar)
  withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
----h----e----L----L----o|
*/

var combined = zipFive.pipe(withLatestFrom(zipSeven, (c, n) =>
  n === 1 ? c.toUpperCase() : c.toLowerCase()
));

// var combined = zipFive.pipe(
//   withLatestFrom(zipFive, zipSeven, (c, n) =>
//     n === 1 ? c.toUpperCase() : c.toLowerCase()
//   )
// );

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
