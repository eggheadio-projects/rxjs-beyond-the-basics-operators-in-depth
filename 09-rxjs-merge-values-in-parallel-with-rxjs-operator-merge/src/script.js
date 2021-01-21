import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/interval";

var foo = Observable.interval(500);
var takeFour = foo.pipe(take(4));

var bar = Observable.interval(300);
var takeFive = bar.pipe(take(5));

/*
----0----1----2----(3|)     (foo)
--0--1--2--3--(4|)          (bar)
    merge
--0-01--21-3--(24)-(3|)
*/

var merged = Observable.merge(takeFour, takeFive);

merged.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);