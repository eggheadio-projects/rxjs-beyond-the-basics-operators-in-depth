var foo = Rx.Observable.interval(100).take(5);

/*
--0--1--2--3--4|
 delayWhen(x => -----0|)
--------0--1--2--3--4|
*/

// delay(1000)
var result = foo.delayWhen( () =>
  Rx.Observable.interval(1000).take(1)
);

result.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);