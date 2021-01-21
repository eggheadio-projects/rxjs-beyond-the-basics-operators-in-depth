import { Observable } from "rxjs";
import { take, buffer, zip } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/interval";

var foo = Observable.interval(600).pipe(
  zip(Observable.of('h', 'e', 'l', 'l', 'o'), (x, y) => y),
  take(5)
);

var bar = Observable.interval(900).pipe(
  take(3)
)
/*
-----h-----e-----l-----l-----o|       (foo)
--------0--------1--------2|          (bar)

        buffer(bar)

--------h--------e--------ll|
*/

var result = foo.pipe(buffer(bar));

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);