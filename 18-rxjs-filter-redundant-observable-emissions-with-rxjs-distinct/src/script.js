import { of, interval, zip } from "rxjs";
import { map, take, distinctUntilChanged } from 'rxjs/operators';

let foo = zip(interval(500), of('a', 'b', 'a', 'a', 'b')).pipe(
  map(([x,y])=> y),
  take(5)
)

/*
--a--b--a--a--b|
   distinctUntilChanged
--a--b--a-----b|
*/

let result = foo.pipe(distinctUntilChanged());

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);