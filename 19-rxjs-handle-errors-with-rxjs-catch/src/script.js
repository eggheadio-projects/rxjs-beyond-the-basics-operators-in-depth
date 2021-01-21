// WIP https://auth0.com/blog/whats-new-in-rxjs-6/

import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";

var foo = Math.random()
var fooInterval = Observable.interval(500);
var fooCombined = Observable.zip(foo, fooInterval, (x)=> x)

/*
--a--b--c--d--2|     (foo)
map(toUpperCase)
--A--B--C--D--#      (bar)
catch(# => -Z|)
--A--B--C--D--Z|
*/

var bar = fooCombined.pipe(
  map(x => {
    return x < 0.5
  }),
  catchError(e => {
    return Observable.of(e)
  }) 
)

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);