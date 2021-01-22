import { interval } from "rxjs";
import { filter } from 'rxjs/operators';

let foo = interval(1000);

/*
--0--1--2--3--4--5--6--7-
 filter(x => x % 2 === 0)
--0-----2-----4-----6----
*/

let bar = foo.pipe(filter((x) => x % 2 === 0));

bar.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);
