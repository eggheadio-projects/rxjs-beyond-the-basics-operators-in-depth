import { Observable } from "rxjs";
import { take, distinctUntilChanged } from "rxjs/operators";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";

var foo = Observable.of('a', 'b', 'a', 'a', 'b')
var fooInterval = Observable.interval(500);
var fooTakeFive = fooInterval.pipe(take(5));
var fooCombined = Observable.zip(foo, fooTakeFive, (x)=>x);


// var foo = Observable.interval(500)
// var fooTakeFive = foo.pipe(take(5))
// var fooZip = fooTakeFive.pipe(zip(Observable.of('a', 'b', 'a', 'a', 'b'), (x,y)=>y));

/*
--a--b--a--a--b|
   distinctUntilChanged
--a--b--a-----b|
*/

var result = fooCombined.pipe(distinctUntilChanged());

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);