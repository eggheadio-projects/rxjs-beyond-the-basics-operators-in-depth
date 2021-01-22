import { interval } from "rxjs";
import { take, throttleTime } from 'rxjs/operators';

// setting the interval to 1000, makes the output the same as the instructors. 
let foo = interval(1000).pipe(
  take(5)
)

/*
--0--1--2--3--4|
  debounceTime(1000) // waits for silence, then emits
  throttleTime(1000) // first emits, then causes silence
--0-----2-----4|
*/

let result = foo.pipe(throttleTime(1000));

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);