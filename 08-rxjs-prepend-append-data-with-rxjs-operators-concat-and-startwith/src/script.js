import { Observable } from "rxjs";
import { take, startWith } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/interval";

var foo = Observable.interval(500).pipe(
  take(4)
);
// var more = Observable.of(4, 5, 6, 7, 8, 9);

/*
--0--1--2--3--4--5--6--7-...
    take(4)
(a|)                      (prefix)
--0--1--2--3|             (foo)
   concat
a-0--1--2--3|
*/

// var bar = Observable.concat(foo, more);
var bar = foo.pipe(startWith("a"));

bar.subscribe(
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