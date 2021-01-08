import { Observable } from "rxjs";
import { take, scan } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/interval";

var foo = Observable.of('h', 'e', 'l', 'l', 'o')
  .zip(Observable.interval(600).take(5), (x,y) => x);
var bar = Observable.interval(900).take(3);

/*
-----h-----e-----l-----l-----o|       (foo)
--------0--------1--------2|          (bar)

        buffer(bar)

--------h--------e--------ll|
*/

var result = foo.buffer(bar);

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);