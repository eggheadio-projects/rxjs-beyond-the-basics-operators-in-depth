var foo = Rx.Observable.interval(100).take(5);

/*
--0--1--2--3--4|
  debounceTime(1000) // delay
  debounce           // delayWhen
----0--1--2--3--4|
*/

var result = foo.debounce(() =>
  Rx.Observable.interval(1000).take(1)
);

result.subscribe(
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