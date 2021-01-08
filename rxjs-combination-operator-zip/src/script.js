var foo = Rx.Observable.of('h', 'e', 'l', 'l', 'o');
var bar = Rx.Observable.interval(400).take(5);

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

var combined = Rx.Observable.zip(foo, bar, (x,y) => x);

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