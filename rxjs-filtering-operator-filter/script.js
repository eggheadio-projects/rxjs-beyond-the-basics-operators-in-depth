var foo = Rx.Observable.interval(1000);

/*
--0--1--2--3--4--5--6--7-
 filter(x => x % 2 === 0)
--0-----2-----4-----6----
*/

var bar = foo.filter(x => x % 2 === 0);

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