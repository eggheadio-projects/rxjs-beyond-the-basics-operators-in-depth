import { Observable, combineLatest } from "rxjs";
import { take } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(500).pipe(
  take(4)
);

var bar = Observable.interval(300).pipe(
  take(5)
);

/*
----0----1----2----(3|)     (weight)
--0--1--2--3--(4|)          (height)
   combineLatest((x, y) => x+y)
----01--23-4--(56)-(7|)
*/

// This is deprecated. To combine observables, use combineLatest(observable, observable)
// var combined = foo.pipe(combineLatest(bar, (x, y) => x + y));

var combined = combineLatest(foo, bar, (x,y) => x+y);

// merge: OR
// combineLatest: AND

combined.subscribe(
  function (x) {
    console.log("next " + x);
  },
  function (err) {
    console.log("error " + err);
  },
  function () {
    console.log("done");
  }
);
