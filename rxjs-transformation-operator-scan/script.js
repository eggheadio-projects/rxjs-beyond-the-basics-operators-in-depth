var foo = Rx.Observable.of('h', 'e', 'l', 'l', 'o');
var bar = Rx.Observable.interval(600).take(5);

/*
(hello|)                          (foo)
-----0-----1-----2-----3-----4|   (bar)
       zip((x,y) => x)
-----h-----e-----l-----l-----o|
  scan((acc, x) => acc+x, '')
-----h-----(he)--(hel)-(hell)(hello|)
*/

var combined = foo.zip(bar, (x,y) => x).scan((acc, x) => acc+x, '');

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