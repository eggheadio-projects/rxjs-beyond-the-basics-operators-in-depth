import { interval } from "rxjs";
import { map, mapTo } from 'rxjs/operators';

let foo = interval(1000);

/*
foo: ---0---1---2---3--...
       map(x => x / 2)
bar: ---0---2---4---6--...
*/

let bar = foo.pipe(mapTo(10))

// uncomment below to see map example
// let bar = foo.pipe(map(x => x / 2));

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);