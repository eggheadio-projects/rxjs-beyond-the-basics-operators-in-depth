var foo = Rx.Observable.interval(200).take(4);

/*
foo: ---0---1---2---3--...
      do(x => console.log('before ' + x))
     ---0---1---2---3--...
       map(x => x * 2)
     ---0---2---4---6--...
      do(x => console.log('after ' + x))
     ---0---2---4---6--...
*/

var bar = foo
  .do(x => console.log('before ' + x) || displayInPreview('before ' + x))
  .map(x => x * 2)
  .do(x => console.log('after ' + x) || displayInPreview('after ' + x));

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