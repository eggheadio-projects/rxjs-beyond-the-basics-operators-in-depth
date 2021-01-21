//WIP

import { Observable } from "rxjs";
import { take, buffer } from "rxjs/operators";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/interval";

var foo = Observable.interval(('h', 'e', 'l', 'l', 'o'), 600);
var fooZip = Observable.zip(foo);
var fooTakeFive = fooZip.pipe(take(5));

var bar = Observable.interval(900)
var barTakeThree = bar.pipe(take(3));

/*
-----h-----e-----l-----l-----o|       (foo)
--------0--------1--------2|          (bar)

        buffer(bar)

--------h--------e--------ll|
*/

var result = fooTakeFive.pipe(buffer(barTakeThree));

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);