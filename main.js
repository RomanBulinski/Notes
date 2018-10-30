


document.body.addEventListener("load", loadInfoFromLocalStore() );





function loadInfoFromLocalStore(){

  for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    // console.log( localStorage.key( i ) + ": " + localStorage.getItem( localStorage.key( i ) ) );
      
      setTimeout(function(){ var idNot = create_note();}, 2000);
      i=i+2;
     
  }

  console.log( " there is "+len/3+"notes"  )
}


function createNotesFromLocalStore(){
  var idNot = create_note();


  // document.getElementById("result").innerHTML = localStorage.getItem("lastname");

}

document.getElementById("createnote_button").addEventListener("click", create_note );

function cancel_note(){
  var id_button = event.srcElement.id;
  var len = id_button.length;
  var id_card = id_button.substr(0, len - 3);
  body.removeChild(document.getElementById(id_card));
}

function create_note() {

  var randomnumber = Math.floor(Math.random()*100);
  var time = new Date().getUTCMilliseconds();
  var timestamp=time + randomnumber;

  note_frame = document.createElement("div");
  note_frame.setAttribute("id", timestamp);
  note_frame.setAttribute("class", "frame_body");
  
  // header
      header = document.createElement("div");
      header.setAttribute("id", timestamp+"header");
      header.setAttribute("class", "header_body");
      note_frame.appendChild(header);
  // button
      var cancel_button = document.createElement("BUTTON");
      cancel_button.setAttribute("id", timestamp+"_cb");
      cancel_button.setAttribute("class", "cancelbutton");
      cancel_button.innerHTML="x";
      note_frame.appendChild(cancel_button);
      cancel_button.addEventListener("click", cancel_note );
  // text area
      var text_area = document.createElement("TEXTAREA");
      text_area.setAttribute("class", "text_innote");
      text_area.setAttribute("id", timestamp+"text_innote");
      note_frame.appendChild(text_area);

  document.body.appendChild(note_frame);
  // Make the DIV element draggable:
  dragElement(document.getElementById(timestamp));
  // return id for leater porpose
  return timestamp;
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id+ "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;

    var idheader = event.srcElement.id;
    var len = idheader.length;
    var pureid = idheader.substr(0, len - 6);
    var frame = document.getElementById(pureid);

    // document.getElementById(pureid+"text_innote").value = frame.offsetTop +" "+frame.offsetLeft;
    var text = document.getElementById(pureid+"text_innote").value;

    // save information in local store memory
    localStorage.setItem( pureid+"|top", frame.offsetTop );
    localStorage.setItem( pureid+"|left", frame.offsetLeft);
    localStorage.setItem( pureid+"|text", text); 

  }
}