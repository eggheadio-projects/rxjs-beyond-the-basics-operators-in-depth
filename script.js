var foo = Rx.Observable.interval(1000).take(5);

/*
--0--1--2--3--4--5--6--7-...
         take(5)
--0--1--2--3--4|    (foo)
    last()
---------------(4|)  (bar)
*/

var bar = foo.last();

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