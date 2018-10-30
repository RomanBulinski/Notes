

window.addEventListener('load', loadInfoFromLocalStore );

function loadInfoFromLocalStore(){
  alert("LOAD");
  // localStorage.clear();
  
  var len = localStorage.length;

  for ( var i = 0;  i < len; i++ ) {
    for ( var j = i+1;  j < len; j++ ) {
      for ( var k = j+1;  k < len; k++) {

          var tem1 = localStorage.key( i ).split("_")[0];
          // alert(tem1);
          var tem2 = localStorage.key( j ).split("_")[0];
          // alert(tem2);
          var tem3 = localStorage.key( k ).split("_")[0];

          
          if( tem1==tem2 && tem2==tem3 ){
            
            var idNot = create_note();

            var top =0;
            if (localStorage.key(i).split("_")[1]=="top"){
                top = localStorage.getItem(localStorage.key(i));
            } else if (localStorage.key(j).split("_")[1]=="top"){
                top = localStorage.getItem( localStorage.key(j) );
            } else if (localStorage.key(k).split("_")[1]=="top"){
                top = localStorage.getItem( localStorage.key(k));
            }
            console.log( "top : "+ top );
           
            var left =0;
            if (localStorage.key(i).split("_")[1]=="left"){
                left = localStorage.getItem( localStorage.key(i));
            }else if(localStorage.key(j).split("_")[1]=="left"){
                left = localStorage.getItem( localStorage.key(j));
            }else if(localStorage.key(k).split("_")[1]=="left") {
                left = localStorage.getItem( localStorage.key(k));
            }    
            console.log("left : " +left );
            var textinnote ="";
            if (localStorage.key(i).split("_")[1]=="textinnote"){
                textinnote = localStorage.getItem( localStorage.key(i));
            }else if(localStorage.key(j).split("_")[1]=="textinnote"){
                textinnote = localStorage.getItem(localStorage.key(j));
            }else if(localStorage.key(k).split("_")[1]=="textinnote"){
                textinnote = localStorage.getItem(localStorage.key(k));
            }
            console.log( "text : "+ textinnote );

            // console.log( document.getElementById(idNot).style[top] );

            document.getElementById(idNot).style.top = top+"px";
            document.getElementById(idNot).style.left = left+"px";
            
          
            document.getElementById(idNot+"_textinnote").innerHTML=textinnote;
          
            i=i+2; 
          }
      }
    } 
  }

  console.log( " loadeds "+len/3+"notes"  )
}



document.getElementById("createnote_button").addEventListener("click", create_note );



function cancel_note(){

  var id_button = event.srcElement.id;

  var id_card = id_button.substring(0,id_button.length-3);

  document.getElementById(id_card).remove();

  localStorage.removeItem(id_card+"_textinnote");
  localStorage.removeItem(id_card+"_top");
  localStorage.removeItem(id_card+"_left");

}

function create_note() {

  // generate unique id on basis time and random number from 0 -100
  var randomnumber = Math.floor(Math.random()*100);
  var time = new Date().getUTCMilliseconds();
  var timestamp=time +""+ randomnumber;

  note_frame = document.createElement("div");
  note_frame.setAttribute("id", timestamp);
  note_frame.setAttribute("class", "framebody");

  localStorage.setItem( timestamp+"_top", note_frame.offsetTop );
  localStorage.setItem( timestamp+"_left", note_frame.offsetLeft);
  
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
    var text = document.getElementById(pureid+"_textinnote").value;
    document.getElementById(pureid+"_textinnote").innerHTML=text;

    // save posytion in local store memory
    localStorage.setItem( pureid+"_top", frame.offsetTop );
    localStorage.setItem( pureid+"_left", frame.offsetLeft);

  }
}

function putTextInHTML(){
  var id_textArea = event.srcElement.id;
  var text = document.getElementById(id_textArea).value+"";
  document.getElementById(id_textArea).innerHTML = text;
  localStorage.setItem( id_textArea, text); 
}









