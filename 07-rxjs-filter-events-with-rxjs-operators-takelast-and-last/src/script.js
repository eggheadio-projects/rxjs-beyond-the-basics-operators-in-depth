import { Observable } from "rxjs";
import { last, takeLast, take } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(1000).pipe(
  take(5)
);

/*
--0--1--2--3--4--5--6--7-...
         take(5)
--0--1--2--3--4|    (foo)
    last()
---------------(4|)  (bar)
*/

// Uncomment below to see last operator output
// var bar = foo.pipe(last());
var bar = foo.pipe(takeLast(2));

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
