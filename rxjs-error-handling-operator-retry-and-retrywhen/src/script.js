import { Observable } from "rxjs";
import { map, retryWhen, delay } from 'rxjs/operators';
// uncomment below to see retry operator
// import { retry } from 'rxjs/operators';
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";

var foo = Observable.of('a', 'b', 'c', 'd', 2)
var fooInterval = Observable.interval(500);
var fooCombined = Observable.zip(foo, fooInterval, (x)=>x);


var bar = fooCombined.pipe(map(x => x.toUpperCase()));

/*
--a--b--c--d--2|     (foo)
map(toUpperCase)
--A--B--C--D--#      (bar)
 retryWhen
--A--B--C--D-----------A--B--C--D-------------A--B--C--D---
*/

// uncommet below to see retry operator
// var result = bar.pipe(retry(2));

var result = bar.pipe(retryWhen(errorObs => errorObs.pipe(delay(3000))));

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);