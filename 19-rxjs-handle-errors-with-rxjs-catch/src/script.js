import { interval } from "rxjs";
import { map, catchError } from 'rxjs/operators';

let foo = interval(500).pipe(
  map(() => Math.random()) 
)

let bar = foo.pipe(
  map( x => {
    if (x < 0.5) {
      return x
    } else {
      throw new Error('Too large number')
    }
  })
)

/*
--a--b--c--d--2|     (foo)
map(toUpperCase)
--A--B--C--D--#      (bar)
catch(# => -Z|)
--A--B--C--D--Z|
*/

let result = bar.pipe(
  catchError((e, outputObs) => outputObs)
);

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);