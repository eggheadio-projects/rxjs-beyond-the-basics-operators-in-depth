var foo = Rx.Observable.interval(500)
  .zip(Rx.Observable.of('a','b','c','d',2), (x,y)=>y);

var bar = foo.map(x => x.toUpperCase());

/*
--a--b--c--d--2|     (foo)
map(toUpperCase)
--A--B--C--D--#      (bar)
 retryWhen
--A--B--C--D-----------A--B--C--D-------------A--B--C--D---
*/

var result = bar.retryWhen(errorObs => errorObs.delay(3000));

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