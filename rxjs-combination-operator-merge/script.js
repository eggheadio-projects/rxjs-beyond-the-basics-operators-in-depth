var foo = Rx.Observable.interval(500).take(4);
var bar = Rx.Observable.interval(300).take(5);

/*
----0----1----2----(3|)     (foo)
--0--1--2--3--(4|)          (bar)
    merge
--0-01--21-3--(24)-(3|)
*/

var merged = Rx.Observable.merge(foo, bar);

merged.subscribe(
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