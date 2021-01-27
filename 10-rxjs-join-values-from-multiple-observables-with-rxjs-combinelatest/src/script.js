import { interval, combineLatest } from "rxjs";
import { take } from 'rxjs/operators';

let foo = interval(500).pipe(
  take(4)
);

let bar = interval(300).pipe(
  take(5)
);

/*
----0----1----2----(3|)     (weight)
--0--1--2--3--(4|)          (height)
   combineLatest((x, y) => x+y)
----01--23-4--(56)-(7|)
*/

// This is deprecated. To combine observables, use combineLatest(observable, observable)
// let combined = foo.pipe(combineLatest(bar, (x, y) => x + y));

let combined = combineLatest(foo, bar, (x,y) => x+y);

// merge: OR
// combineLatest: AND

combined.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
