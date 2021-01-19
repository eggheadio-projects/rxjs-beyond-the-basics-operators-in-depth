import { Observable } from "rxjs";
import { take, delayWhen, delay } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/interval";

var foo = Observable.interval(100).take(5);

/*
--0--1--2--3--4|
  debounceTime(1000) // delay
  debounce           // delayWhen
----0--1--2--3--4|
*/

var result = foo.debounce(() =>
  Observable.interval(1000).take(1)
);

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);