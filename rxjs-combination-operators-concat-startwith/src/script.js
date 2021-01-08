import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(500);
const takeFour = foo.pipe(take(4));
var prefix = Rx.Observable.of('a');

/*
--0--1--2--3--4--5--6--7-...
    take(4)
(a|)                      (prefix)
--0--1--2--3|             (foo)
   concat
a-0--1--2--3|
*/

var bar = prefix.concat(takeFour);

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);
