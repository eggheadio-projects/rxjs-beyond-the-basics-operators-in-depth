import { of, interval, zip } from "rxjs";
import { map, retryWhen, delay } from 'rxjs/operators';
// uncomment below to see retry operator
// import { retry } from 'rxjs/operators';

let foo = zip(interval(500), of('a', 'b', 'c', 'd', 2)).pipe(
  map(([x,y])=> y)
)

let bar = foo.pipe(map(x => x.toUpperCase()));

/*
--a--b--c--d--2|     (foo)
map(toUpperCase)
--A--B--C--D--#      (bar)
 retryWhen
--A--B--C--D-----------A--B--C--D-------------A--B--C--D---
*/

// uncomment below to see retry operator
// let result = bar.pipe(retry(2));

let result = bar.pipe(retryWhen(errorObs => errorObs.pipe(delay(3000))));

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);