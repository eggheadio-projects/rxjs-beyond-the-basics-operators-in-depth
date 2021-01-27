import { interval } from "rxjs";
import { take, tap, map } from 'rxjs/operators';

let foo = interval(200).pipe(
  take(4)
);

/*
foo: ---0---1---2---3--...
      do(x => console.log('before ' + x))
     ---0---1---2---3--...
       map(x => x * 2)
     ---0---2---4---6--...
      do(x => console.log('after ' + x))
     ---0---2---4---6--...
*/

let bar = foo.pipe(
  tap((x) => console.log("before " + x)),
  map((x) => x * 2),
  tap((x) => console.log("after " + x))
)

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
