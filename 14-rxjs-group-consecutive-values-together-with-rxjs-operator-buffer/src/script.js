import { interval, zip, of } from "rxjs";
import { take, buffer, map } from 'rxjs/operators';

let foo = zip(interval(600), of('h', 'e', 'l', 'l', 'o')).pipe(
  map(([x, y]) => y),
  take(5)
);

let bar = interval(900).pipe(
  take(3)
)
/*
-----h-----e-----l-----l-----o|       (foo)
--------0--------1--------2|          (bar)

        buffer(bar)

--------h--------e--------ll|
*/

let result = foo.pipe(buffer(bar));

result.subscribe(
  (x) => console.log('next ' + x),
  (err) => console.log('error ' + err),
  () => console.log('done')
);