var foo = Rx.Observable.interval(1000);

/*

foo: ---0---1---2---3--...
        multiplyBy(2)
bar: ---0---2---4---6--...

*/

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

var bar = foo.multiplyBy(2);

bar.subscribe(
  function (x) { console.log('next ' + x) || displayInPreview('next ' + x); },
  function (err) { console.log('error ' + err) || displayInPreview('error ' + err); },
  function () { console.log('done') || displayInPreview('done'); },
);



// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}