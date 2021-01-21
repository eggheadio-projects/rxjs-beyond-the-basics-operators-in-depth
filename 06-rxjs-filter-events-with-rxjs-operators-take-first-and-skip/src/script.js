import { Observable } from "rxjs";
import { skip, first, take } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(100);

/*
--0--1--2--3--4--5--6--7-
         skip(5)
         take(5)
-----------------5--6--7-
*/

var bar = foo.pipe(take(5));

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
