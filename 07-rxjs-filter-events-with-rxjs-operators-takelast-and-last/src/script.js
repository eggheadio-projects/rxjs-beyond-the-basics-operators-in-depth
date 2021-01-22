import { interval } from "rxjs";
import { take, last, takeLast } from 'rxjs/operators';

let foo = interval(1000).pipe(
  take(5)
);

/*
--0--1--2--3--4--5--6--7-...
         take(5)
--0--1--2--3--4|    (foo)
    last()
---------------(4|)  (bar)
*/

// Uncomment below to see last operator output
// let bar = foo.pipe(last());
let bar = foo.pipe(takeLast(2));

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
