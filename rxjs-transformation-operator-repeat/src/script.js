import { Observable } from "rxjs";
import { map, repeat } from 'rxjs/operators';
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";

var foo = Observable.of('a', 'b', 'c', 'd')
var fooInterval = Observable.interval(500);
var fooCombined = Observable.zip(foo, fooInterval, (x)=>x);


var bar = fooCombined.pipe(map(x => x.toUpperCase()));

/*
--a--b--c--d|     (foo)
map(toUpperCase)
--A--B--C--D|      (bar)
 repeat
--A--B--C--D--A--B--C--D--A--B--C--D|
*/

var result = bar.pipe(repeat(3));

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);