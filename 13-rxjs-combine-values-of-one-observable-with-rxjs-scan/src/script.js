import { Observable } from "rxjs";
import { take, scan } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/interval";

var foo = Observable.of('h', 'e', 'l', 'l', 'o');
var bar = Observable.interval(600).pipe(
  take(5)
)

/*
(hello|)                          (foo)
-----0-----1-----2-----3-----4|   (bar)
       zip((x,y) => x)
-----h-----e-----l-----l-----o|
  scan((acc, x) => acc+x, '')
-----h-----(he)--(hel)-(hell)(hello|)
*/

var combined = Observable.zip(foo, bar, (x,y) => x).pipe(scan((acc, x) => acc+x, ''));

combined.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);