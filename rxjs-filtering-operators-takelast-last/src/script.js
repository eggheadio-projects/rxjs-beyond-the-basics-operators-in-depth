import { Observable } from "rxjs";
import { skip, first, take } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(1000).take(5);

/*
--0--1--2--3--4--5--6--7-...
         take(5)
--0--1--2--3--4|    (foo)
    last()
---------------(4|)  (bar)
*/

var bar = foo.last();

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);