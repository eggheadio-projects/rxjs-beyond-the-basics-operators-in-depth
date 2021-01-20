import { Observable } from "rxjs";
import { take, debounce, debounceTime } from "rxjs/operators";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";

var foo = Observable.interval(500)
var fooTakeFive = foo.pipe(take(5))
var fooZip = Observable.zip(Rx.Observable.of('a','b','a','a','b'), (x,y)=>y);

/*
--a--b--a--a--b|
   distinctUntilChanged
--a--b--a-----b|
*/

var result = foo.distinctUntilChanged();

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);