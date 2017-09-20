var foo = Rx.Observable.interval(500).take(5)
  .zip(Rx.Observable.of('a','b','a','a','b'), (x,y)=>y);

/*
--a--b--a--a--b|
   distinctUntilChanged
--a--b--a-----b|
*/

var result = foo.distinctUntilChanged();

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