import { of, interval, zip } from "rxjs";
import { map, repeat } from 'rxjs/operators';

let foo = zip(interval(500), of('a', 'b', 'c', 'd')).pipe(
  map(([x,y])=> y)
)


let bar = foo.pipe(map(x => x.toUpperCase()));

/*
--a--b--c--d|     (foo)
map(toUpperCase)
--A--B--C--D|      (bar)
 repeat
--A--B--C--D--A--B--C--D--A--B--C--D|
*/

let result = bar.pipe(repeat(3));

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);