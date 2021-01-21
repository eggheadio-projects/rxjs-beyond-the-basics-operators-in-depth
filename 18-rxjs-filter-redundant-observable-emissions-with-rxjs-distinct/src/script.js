import { Observable } from "rxjs";
import { take, distinctUntilChanged, zip } from "rxjs/operators";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";

var foo = Observable.interval(500).pipe(
  zip(Observable.of('a', 'b', 'a', 'a', 'b'), (x,y)=>y),
  take(5)
);


/*
--a--b--a--a--b|
   distinctUntilChanged
--a--b--a-----b|
*/

var result = foo.pipe(distinctUntilChanged());

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);