import { interval, zip, of } from "rxjs";
import { take } from 'rxjs/operators';

let foo = of('h', 'e', 'l', 'l', 'o');
let bar = interval(400).pipe(
  take(5)
)

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

let combined = zip(foo, bar, (x) => x);

combined.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);