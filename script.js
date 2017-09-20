var foo = Rx.Observable.interval(500).take(4);
var prefix = Rx.Observable.of('a');

/*
--0--1--2--3--4--5--6--7-...
    take(4)
(a|)                      (prefix)
--0--1--2--3|             (foo)
   concat
a-0--1--2--3|
*/

var bar = prefix.concat(foo);

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