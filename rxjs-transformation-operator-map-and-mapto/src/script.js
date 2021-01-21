import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import "rxjs/add/observable/interval";

var foo = Observable.interval(1000);

/*

foo: ---0---1---2---3--...
       map(x => x / 2)
bar: ---0---2---4---6--...

*/

var bar = foo.pipe(map(x => x / 10));

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')}
);