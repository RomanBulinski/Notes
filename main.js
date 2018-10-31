

window.addEventListener('load', loadInfoFromLocalStore );


function loadInfoFromLocalStore(){
 
  // localStorage.clear();
  alert("LOAD");
  var len = localStorage.length;
  
  console.log("local storage");
  for (var i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
  }

  var infoFromMemor = [];

  for ( var i = 0;  i < len-2; i++ ) {  
    for ( var j = i+1;  j < len-1; j++ ) {
      for ( var k = j+1;  k < len; k++) {
        if( localStorage.key( i ).split("_")[0]===localStorage.key( j ).split("_")[0] && localStorage.key( i ).split("_")[0]===localStorage.key( k ).split("_")[0] ){ 
        
          var tempI = localStorage.key( i );
          var tempJ = localStorage.key( j );
          var tempK = localStorage.key( k );
        
          console.log( "znalazlem 3 pdoobne: "+tempI+" "+tempJ+" "+tempK );

          var data = [];
          data.push(tempI);
          data.push(tempJ);
          data.push(tempK);

          // wszystko co znadje dodaje w kolejnoeci do zewnetrznego arraya
          for ( var a =0; a<data.length; a++ ) {
            if( data[a].includes("top") ){  
              infoFromMemor.push(localStorage.getItem(data[a]));
            } 
          }   
          for ( var a =0; a<data.length;a++ ) {  
            if( data[a].includes("left") ){
              infoFromMemor.push(localStorage.getItem(data[a]));
            }
          }
          for ( var a =0; a<data.length; a++ ) { 
            if( data[a].includes("textinnote") ){  
              infoFromMemor.push(localStorage.getItem(data[a]));
            }
          }
        }
        // i++; 
      }
    } 
  }
  console.log( "there is  "+infoFromMemor.length+" posytion."  )
  console.log(infoFromMemor );

  localStorage.clear();

  if( infoFromMemor.length >2){
    for ( var i = 0; i<infoFromMemor.length; i++ ) {
        var idNot = create_note();
        document.getElementById(idNot).style.top = infoFromMemor[i];
        localStorage.setItem( idNot+"_top", infoFromMemor[i] );
        i++;
        document.getElementById(idNot).style.left = infoFromMemor[i];
        localStorage.setItem( idNot+"_left", infoFromMemor[i] );
        i++;
        document.getElementById(idNot+"_textinnote").innerHTML=infoFromMemor[i];
        localStorage.setItem( idNot+"_textinnote", infoFromMemor[i]);
        // i++;
    }
  }
}

function cancel_note(){
  var id_button = event.srcElement.id;
  var id_card = id_button.substring(0,id_button.length-3);
  document.getElementById(id_card).remove();
  localStorage.removeItem(id_card+"_textinnote");
  localStorage.removeItem(id_card+"_top");
  localStorage.removeItem(id_card+"_left");
}

document.getElementById("createnote_button").addEventListener("click", create_note );


function create_note() {

  // generate unique id on basis time and random number from 0 -100
  var randomnumber = Math.floor(Math.random()*100);
  var time = new Date().getUTCMilliseconds();
  var timestamp=time +""+ randomnumber;
  // main note div
  note_frame = document.createElement("div");
  note_frame.setAttribute("id", timestamp);
  note_frame.setAttribute("class", "framebody");
  
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
      text_area.setAttribute("class", "textinnote");
      text_area.setAttribute("id", timestamp+"_textinnote");
      note_frame.appendChild(text_area);
      
      text_area.addEventListener("keypress", putTextInHTML) 
     
  body.appendChild(note_frame);

  document.getElementById(timestamp+"_textinnote").innerHTML="...";

  localStorage.setItem( timestamp+"_top", note_frame.offsetTop+"px" );
  localStorage.setItem( timestamp+"_left", note_frame.offsetLeft+"px");
  // Make the DIV element draggable:
  dragElement(document.getElementById(timestamp));
  // return id for leater porpose
  console.log( "stworzylem nowa karte "  )
  return timestamp;
}

function putTextInHTML(){
  var id_textArea = event.srcElement.id;
  var text = document.getElementById(id_textArea).value+"";
  document.getElementById(id_textArea).innerHTML = text;
  localStorage.setItem( id_textArea, text);
  console.log( "wprowadzilem tekst na karte"  ) 
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

    var idHeader = event.srcElement.id;
    var len = idHeader.length;
    var idFrameNote = idHeader.substr(0, len - 6);
    var frame = document.getElementById(idFrameNote);

    // document.getElementById(idFrameNote+"text_innote").value = frame.offsetTop +" "+frame.offsetLeft;
    var text = document.getElementById(idFrameNote+"_textinnote").value;
    document.getElementById(idFrameNote+"_textinnote").innerHTML=text;

    // save posytion in local store memory
    localStorage.setItem( idFrameNote+"_top", frame.offsetTop+"px" );
    localStorage.setItem( idFrameNote+"_left", frame.offsetLeft+"px");

  }
}