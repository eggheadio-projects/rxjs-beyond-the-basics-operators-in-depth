import { interval } from "rxjs";
import { take, debounce, debounceTime } from 'rxjs/operators';

let foo = interval(100).pipe(
  take(5)
);

/*
--0--1--2--3--4|
  debounceTime(1000) // delay
  debounce           // delayWhen
----0--1--2--3--4|
*/

// uncomment the 3 lines below to see debounce code
// let result = foo.pipe(debounce(() =>
//   interval(1000)
// ));

let result = foo.pipe(debounceTime(5000));

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
