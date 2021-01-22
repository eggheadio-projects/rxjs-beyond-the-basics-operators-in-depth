import { interval, of, concat } from "rxjs";
import { take, startWith } from 'rxjs/operators';

let foo = interval(500).pipe(
  take(4)
);
// let more = of(4, 5, 6, 7, 8, 9);

/*
--0--1--2--3--4--5--6--7-...
    take(4)
(a|)                      (prefix)
--0--1--2--3|             (foo)
   concat
a-0--1--2--3|
*/

// let bar = concat(foo, more);
let bar = foo.pipe(startWith("a"));

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);