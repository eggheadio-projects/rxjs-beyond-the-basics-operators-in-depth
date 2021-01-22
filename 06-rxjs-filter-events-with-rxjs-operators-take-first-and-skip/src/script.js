import { interval } from "rxjs";
import { first } from 'rxjs/operators';

let foo = interval(100);

/*
--0--1--2--3--4--5--6--7-
         skip(5)
         take(5)
-----------------5--6--7-
*/

// uncomment below to see skip and take operators output
// let bar = foo.pipe(skip(5))
// let bar = foo.pipe(take(5));
let bar = foo.pipe(first())

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
