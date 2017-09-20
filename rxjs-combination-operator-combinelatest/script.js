var foo = Rx.Observable.interval(500).take(4);
var bar = Rx.Observable.interval(300).take(5);

/*
----0----1----2----(3|)     (weight)
--0--1--2--3--(4|)          (height)
   combineLatest((x, y) => x+y)
----01--23-4--(56)-(7|)
*/

var bmi = foo.combineLatest(bar,(x,y) => x+y);

// merge: OR
// combineLatest: AND
                               
bmi.subscribe(
  function (x) { console.log('next ' + x) || displayInPreview ('next ' + x); },
  function (err) { console.log('error ' + err) || displayInPreview ('error ' + err); },
  function () { console.log('done') || displayInPreview ('done'); },
);




// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}