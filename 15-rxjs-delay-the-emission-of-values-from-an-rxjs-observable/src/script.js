import { Observable } from "rxjs";
import { take, delayWhen, delay } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/interval";

var foo = Observable.interval(100).pipe(
  take(5)
)

/*
--0--1--2--3--4|
 delayWhen(x => -----0|)
--------0--1--2--3--4|
*/

// delay(1000)

//uncomment below to see delay operator output
// var result = foo.pipe(delay(2000))

var result = foo.pipe(delayWhen( x =>
  Observable.interval(x * x * 100).pipe(take(1))
));

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);