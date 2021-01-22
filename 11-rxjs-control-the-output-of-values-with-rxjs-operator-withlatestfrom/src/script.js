// WIP

import { interval, zip, of } from "rxjs";
import { take, withLatestFrom } from 'rxjs/operators';

let foo = zip(interval(500), of("H", "e", "l", "l", "o").pipe(
  take(5),
))

let bar = zip(interval(300), of(0, 1, 0, 1, 0, 1, 0).pipe(
  take(7),
));

/*
----H----e----l----l----o|     (foo)
--0--1--0--1--0--1--0|         (bar)
  withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
----h----e----L----L----o|
*/

let combined = foo.pipe(withLatestFrom(bar, ([c, n]) =>
  n === 1 ? c.toUpperCase() : c.toLowerCase()
));

combined.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);