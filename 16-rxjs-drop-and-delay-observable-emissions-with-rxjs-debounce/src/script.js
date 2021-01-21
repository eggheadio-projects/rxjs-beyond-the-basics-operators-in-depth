import { Observable } from "rxjs";
import { take, debounce, debounceTime } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(100).pipe(
  take(5)
);

/*
--0--1--2--3--4|
  debounceTime(1000) // delay
  debounce           // delayWhen
----0--1--2--3--4|
*/

// uncomment the 3 lines below to see debounce code
// var result = foo.pipe(debounce(() =>
//   Observable.interval(1000)
// ));

var result = foo.pipe(debounceTime(5000));

result.subscribe(
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
