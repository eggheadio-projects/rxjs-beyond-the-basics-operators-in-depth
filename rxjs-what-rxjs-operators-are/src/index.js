var foo = Rx.Observable.of(1, 2, 3, 4, 5);

// foo.map
// foo.filter
// foo.merge
// foo.combineLatest

function multiplyBy(multiplier) {
  var source = this;
  var result = Rx.Observable.create(function subscribe(observer) {
    source.subscribe(
      function (x) { observer.next(x * multiplier); },
      function (err) { observer.error(err); },
      function () { observer.complete(); }
    );
  });
  return result;
}

Rx.Observable.prototype.multiplyBy = multiplyBy;

var bar = foo.multiplyBy(100);

bar.subscribe(
  function (x) { console.log('next ' + x)},
  function (err) { console.log('error ' + err)},
  function () { console.log('done')},
);