import { interval, zip, of } from "rxjs";
import { take, scan } from 'rxjs/operators';

let foo = of('h', 'e', 'l', 'l', 'o');
let bar = interval(600).pipe(
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

let combined = zip(foo, bar, (x,y) => x).pipe(scan((acc, x) => acc+x, ''));

combined.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);