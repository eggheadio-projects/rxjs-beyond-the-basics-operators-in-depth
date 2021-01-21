// WIP https://auth0.com/blog/whats-new-in-rxjs-6/

import { Observable } from "rxjs";
import { mapTo, map, catchError } from 'rxjs/operators';
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";

var foo = Observable.interval(500).pipe(
  mapTo(Math.random((x)=> x)) 
)

var bar = foo.pipe(
  map( x => {
    if (x < 0.5) {
      return x
    } else {
      throw new Error('Too large number')
    }
  })
)

/*
--a--b--c--d--2|     (foo)
map(toUpperCase)
--A--B--C--D--#      (bar)
catch(# => -Z|)
--A--B--C--D--Z|
*/

var result = bar.pipe(
  catchError((outputObs) => outputObs)
);

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);