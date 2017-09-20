var foo = Rx.Observable.of('h', 'e', 'l', 'l', 'o')
  .zip(Rx.Observable.interval(600).take(5), (x,y) => x);
var bar = Rx.Observable.interval(900).take(3);

/*
-----h-----e-----l-----l-----o|       (foo)
--------0--------1--------2|          (bar)

        buffer(bar)

--------h--------e--------ll|
*/

var result = foo.buffer(bar);

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