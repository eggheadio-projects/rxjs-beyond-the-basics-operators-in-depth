import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/interval";


var foo = Observable.of('h', 'e', 'l', 'l', 'o');
var bar = Observable.interval(400)
var takeFive = bar.pipe(take(5));

/*
(hello|)                  (foo)
---0---1---2---3---4|     (bar)
  zip((x,y) => x)
---h---e---l---l---o|
*/

// First of foo + First of bar => First of output
// Second of foo + Second of bar => Second of output
// ...
// n-th of foo + n-th of bar => n-th of output

// AND-style:
// combineLatest
// withLatestFrom
// zip

var combined = Observable.zip(foo, takeFive, (x) => x);

combined.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);
