import { interval, zip, of } from "rxjs";
import { take, withLatestFrom } from "rxjs/operators";

const foo = zip(interval(500), of("H", "e", "l", "l", "o"), (_, c) => c).pipe(
  take(5)
);

const bar = zip(interval(300), of(0, 1, 0, 1, 0, 1, 0), (_, n) => n).pipe(
  take(7)
);

/*
----H----e----l----l----o|     (foo)
--0--1--0--1--0--1--0|         (bar)
  withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
----h----e----l----L----o|
*/

const result = foo.pipe(
  withLatestFrom(bar, (c, n) => {
    return n === 1 ? c.toUpperCase() : c.toLowerCase();
  })
);

result.subscribe(
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