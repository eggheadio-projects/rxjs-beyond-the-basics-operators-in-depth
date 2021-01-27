import { interval } from "rxjs";
import { take, delayWhen, delay } from 'rxjs/operators';

let foo = interval(100).pipe(
  take(5)
)

/*
--0--1--2--3--4|
 delayWhen(x => -----0|)
--------0--1--2--3--4|
*/

// delay(1000)

//uncomment below to see delay operator output
// let result = foo.pipe(delay(2000))

let result = foo.pipe(delayWhen( x =>
  interval(x * x * 100).pipe(take(1))
));

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);