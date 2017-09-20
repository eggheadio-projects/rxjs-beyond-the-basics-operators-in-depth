var foo = Rx.Observable.interval(500).take(5)
  .zip(Rx.Observable.of('H', 'e', 'l', 'l', 'o'), (_, c) => c);
var bar = Rx.Observable.interval(300).take(7)
  .zip(Rx.Observable.of(0, 1, 0, 1, 0, 1, 0), (_, x) => x);

/*
----H----e----l----l----o|     (foo)
--0--1--0--1--0--1--0|         (bar)
  withLatestFrom((c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase())
----h----e----L----L----o|
*/

var combined = foo.withLatestFrom(bar, (c,n) => n === 1 ? c.toUpperCase() : c.toLowerCase());

combined.subscribe(
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