var foo = Rx.Observable.interval(100).take(5);

/*
--0--1--2--3--4|
 delayWhen(x => -----0|)
--------0--1--2--3--4|
*/

// delay(1000)
var result = foo.delayWhen(x =>
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