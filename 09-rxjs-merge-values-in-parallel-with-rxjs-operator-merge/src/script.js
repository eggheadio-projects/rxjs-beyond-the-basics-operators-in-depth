import { interval, merge } from "rxjs";
import { take } from 'rxjs/operators';

let foo = interval(500).pipe(
  take(4)
);

let bar = interval(300).pipe(
  take(5)
);

/*
----0----1----2----(3|)     (foo)
--0--1--2--3--(4|)          (bar)
    merge
--0-01--21-3--(24)-(3|)
*/

let merged = merge(foo, bar);

merged.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);