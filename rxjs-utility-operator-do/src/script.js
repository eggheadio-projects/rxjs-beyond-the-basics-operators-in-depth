// 'Rx' is not defined.

var foo = Rx.Observable.interval(200).take(4);

/*
foo: ---0---1---2---3--...
      do(x => console.log('before ' + x))
     ---0---1---2---3--...
       map(x => x * 2)
     ---0---2---4---6--...
      do(x => console.log('after ' + x))
     ---0---2---4---6--...
*/

var bar = foo
  .do(x => console.log('before ' + x))
  .map(x => x * 2)
  .do(x => console.log('after ' + x));

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);