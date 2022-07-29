var counter = -1;
var counter_arr = 0;
var pushcount = 0;
var popcount = 0;
var emptycount = 0;

// getting document wrapper
var docWrapper = document.querySelector('.wrapper');

// getting all modals
var pushModal = document.getElementById("pushmodal");
var popModal = document.getElementById("popmodal");
var emptyModal = document.getElementById("emptymodal");

// getting close buttons for all Modals
var closePush = document.getElementsByClassName("close-push")[0];
var closePop = document.getElementsByClassName("close-pop")[0];
var closeEmpty = document.getElementsByClassName("close-empty")[0];

var push_algo = `PUSH_STACK(STACK,TOP,MAX,ITEM) <br/><br/>

Algorithm to push an item into stack.
<br/><br/>
1) IF TOP = MAX   then<br/>
Print "Stack is full";<br/>
Exit;<br/>
2) Otherwise<br/>
TOP: = TOP + 1;        /*increment TOP*/<br/>
STACK (TOP):= ITEM;<br/>
3) End of IF<br/>
4) Exit`;

var pop_algo = `
POP_STACK(STACK,TOP,ITEM)<br/><br/>

Algorithm to pop an element from stack.<br/><br/>

1) IF TOP = 0 then<br/>
    Print "Stack is empty";<br/>
    Exit;<br/>
2) Otherwise<br/>
    ITEM: =STACK (TOP);<br/>
    TOP:=TOP - 1;<br/>
3) End of IF<br/>
4) Exit<br/>


`;

var isempty_algo = `
IS_EMPTY(STACK,TOP,MAX,STATUS) <br/>
<br/>
    Algorithm to check stack is empty or not.<br/>
    STATUS contains the result status.<br/>
    <br/>
            
    1) IF TOP = 0 then<br/>
        STATUS:=true;<br/>
    2) Otherwise<br/>
        STATUS:=false;<br/>
    3)  End of IF<br/>
    4)  Exit<br/>


`;

var arr = [];
function push() {
  document.getElementById("current_algo").innerHTML = push_algo;
  if (document.getElementById("push-item").value) {

    //trigering popup question
    if (pushcount == 1) {

    }

    if (counter == 8) {
      alert("Overflow : Stack full");
    }
    else {
      counter++;
      pushcount++;
      setTimeout(function () { callPushBox(); }, 2000);
      document.getElementById("pointer").innerHTML = counter;

      arr.push(document.getElementById("push-item").value);
      $("#stack").prepend('<div id="r' + counter + 1 + '" class="stack_box">  ' + document.getElementById("push-item").value +
        " </div>"
      );
      document.getElementById("pushed").innerHTML = document.getElementById(
        "push-item"
      ).value;
      document.getElementById("top_element").innerHTML = arr[counter];
      $("#array").append(
        '<div id="a' +
        counter +
        '" class="array_box">  ' +
        document.getElementById("push-item").value +
        " </div>"
      );
      document.getElementById("push-item").value = "";
      document.getElementById("popped").innerHTML = "";
    }
  }
  else {
    alert("Input cannot be blank ");
  }
}

function pop() {
  document.getElementById("current_algo").innerHTML = pop_algo;
  if (counter >= 0) {
    if (arr[counter] == undefined) {
    } else {
      document.getElementById("popped").innerHTML = arr[counter];
      document.getElementById("pushed").innerHTML = "";
      arr.pop();
    }
    $("#r" + counter + 1).remove();
    $("#a" + counter).remove();

    counter--;
    popcount++;
    setTimeout(function () { callPopBox(); }, 2000);
    if (counter >= 0) {
      document.getElementById("top_element").innerHTML = arr[counter];
    } else {
      document.getElementById("top_element").innerHTML = "";
    }

    document.getElementById("pointer").innerHTML = counter;
  } else {
    counter = -1;
    alert("Underflow : Element cannot be popped");
    document.getElementById("top_element").innerHTML = "";
    document.getElementById("pointer").innerHTML = counter;
  }
}

function ispeak() {
  if (arr[counter] != undefined)
    alert("Element at Peak is : " + arr[counter]);
  else
    alert("Stack is empty.");
}
function isempty() {
  //enabling the popup
  emptycount++;
  setTimeout(function () { callEmptyBox(); }, 6000);
  document.getElementById("current_algo").innerHTML = isempty_algo;
  if (counter < 0) {
    alert("Yes , the given stack is empty! You can PUSH elements into it ");
  } else {
    alert("No , the given stack is not empty. It contains items . ");
  }
}

// Get the modal

var modal = document.getElementById("popup");

// Get the button that opens the modal
var btn = document.getElementById("launch");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  popup.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  popup.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
};

// buttons functionality
// start() function to start predefined simulation
function start() {
  // hiding the start button
  var start = document.getElementById("start");
  start.className = start.className.replace(/\bshow\b/g, "hide");
  // making prev and next buttons visible
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  prev.className = prev.className.replace(/\bhide\b/g, "show");
  next.className = next.className.replace(/\bhide\b/g, "show");
  // hiding user input tab (if displayed at that moment)
  var moveable = document.getElementById("moveable");
  moveable.className = moveable.className.replace(/\bshow\b/g, "hide");
}

// reset() function to reset the simulator
function reset() {
  window.location.reload();
  return false;
}

// input() function to show input tab and take user input
function input() {
  // displaying confirm box
  var choice = confirm("Have you read the Instructions properly?");
  if (choice == true) {
    //displaying the input tab
    var moveable = document.getElementById("moveable");
    moveable.className = moveable.className.replace(/\bhide\b/g, "show");

    //clearing all fields
    $("#start-val").empty();
    $("#mid").empty();
    $("#last").empty();

    //targeting the draggable input box
    document.getElementById("moveable").scrollIntoView(true);

    //closing the instructions tab
    popup.style.display = "none";
  } else {
    reset();
  }
}

var codetab = document.getElementById("code");
codetab.onclick = codetab.className.replace(/\bhide\b/g, "show");

// code to make the div draggable
function makeDragable(dragHandle, dragTarget) {
  let dragObj = null; //object to be moved
  let xOffset = 0; //used to prevent dragged object jumping to mouse location
  let yOffset = 0;

  document
    .querySelector(dragHandle)
    .addEventListener("mousedown", startDrag, true);
  document
    .querySelector(dragHandle)
    .addEventListener("touchstart", startDrag, true);

  /*sets offset parameters and starts listening for mouse-move*/
  function startDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    dragObj = document.querySelector(dragTarget);
    dragObj.style.position = "absolute";
    let rect = dragObj.getBoundingClientRect();

    if (e.type == "mousedown") {
      xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
      yOffset = e.clientY - rect.top;
      window.addEventListener("mousemove", dragObject, true);
    } else if (e.type == "touchstart") {
      xOffset = e.targetTouches[0].clientX - rect.left;
      yOffset = e.targetTouches[0].clientY - rect.top;
      window.addEventListener("touchmove", dragObject, true);
    }
  }

  /*Drag object*/
  function dragObject(e) {
    e.preventDefault();
    e.stopPropagation();

    if (dragObj == null) {
      return; // if there is no object being dragged then do nothing
    } else if (e.type == "mousemove") {
      dragObj.style.left = e.clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
      dragObj.style.top = e.clientY - yOffset + "px";
    } else if (e.type == "touchmove") {
      dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
      dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
    }
  }

  /*End dragging*/
  document.onmouseup = function (e) {
    if (dragObj) {
      dragObj = null;
      window.removeEventListener("mousemove", dragObject, true);
      window.removeEventListener("touchmove", dragObject, true);
    }
  };
}

makeDragable("#handle", "#moveable");


function callPushBox() {
  //code to enable push question popup
  if (pushcount == 3) {
    //getting all options value
    var optionA = document.getElementById('option-a');
    var optionB = document.getElementById('option-b');
    var optionC = document.getElementById('option-c');
    var optionD = document.getElementById('option-d');

    //code to display Push Question popup
    pushModal.style.display = "block";
    docWrapper.classList.add('blur');

    //code to evaluate answers
    optionA.onclick = function () {
      optionA.classList.add('wrong');
    };
    optionB.onclick = function () {
      optionB.classList.add('wrong');
    }
    optionC.onclick = function () {
      optionC.classList.add('wrong');
    };
    //correct answer
    optionD.onclick = function () {
      optionD.classList.add('correct');
      closePush.style.visibility = "visible";
      pushcount += 1;
    };

    //closing popup
    closePush.onclick = function () {
      pushModal.style.display = "none";
      docWrapper.classList.remove('blur');
    };
  }
}

function callPopBox() {
  //code to enable pop question popup
  if (popcount == 3) {
    //getting all options value
    var optionA = document.getElementById('pop-a');
    var optionB = document.getElementById('pop-b');
    var optionC = document.getElementById('pop-c');
    var optionD = document.getElementById('pop-d');

    //code to enable Pop question popup
    popModal.style.display = "block";
    docWrapper.classList.add('blur');

    //evaluating answers
    optionA.onclick = function () {
      optionA.classList.add('wrong');
    };
    //correct answer
    optionB.onclick = function () {
      optionB.classList.add('correct');
      closePop.style.visibility = "visible";
      popcount += 1;
    };
    optionC.onclick = function () {
      optionC.classList.add('wrong');
    };
    optionD.onclick = function () {
      optionD.classList.add('wrong');
    };

    //closing popup
    closePop.onclick = function () {
      popModal.style.display = "none";
      docWrapper.classList.remove('blur');
    };
  }
}

function callEmptyBox() {
  //code to enable empty question popup
  if (emptycount == 1) {
    //getting all options value
    var optionA = document.getElementById('empty-a');
    var optionB = document.getElementById('empty-b');
    var optionC = document.getElementById('empty-c');
    var optionD = document.getElementById('empty-d');

    //code to display IsEmpty Question Popup 
    emptyModal.style.display = "block";
    docWrapper.classList.add('blur');

    //code to evaluate right answers
    optionA.onclick = function () {
      optionA.classList.add('wrong');
    };
    optionB.onclick = function () {
      optionB.classList.add('correct');
      closeEmpty.style.visibility = "visible";
      emptycount += 1;
    };
    optionC.onclick = function () {
      optionC.classList.add('wrong');
    };
    optionD.onclick = function () {
      optionD.classList.add('wrong');
    };

    //closing the question menu
    closeEmpty.onclick = function () {
      emptyModal.style.display = "none";
      docWrapper.classList.remove('blur');
    };
  }
}
