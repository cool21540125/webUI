// Left Side button onchange=改變範例圖片
function changeImgReview() {
    document.getElementById("myImage").src = "img/" + document.getElementById("demo_img").value;
}

// 新增機器by click
function addMachine() {
    var s = 50;
    // Add new Canvas, drawImage on canvas
    var c = document.createElement("canvas");
    c.height = s;
    c.width = s;
    var ctx = c.getContext("2d");

    // Draw image on canvas
    var img = document.getElementById("myImage");
    ctx.drawImage(img, 0, 0, s, s);

    // Append canvas && let it draggable
    document.body.appendChild(c);
    c.className = "ui-draggable";
    $(".ui-draggable").draggable();
}


function getMouseXY(event) {
    var x = event.clientX;
    var y = event.clientY;
    return x, y;
}

// document.addEventListener("dblclick", function () {
//     addMachine();
//     var myState = this;
//     var s = 50;
//     var mouse = myState.getMouse(event);
//     x, y = getMouseXY(event);
//     myState.addShape(new Shape(x - 10, y - 10, s, s,
//         'rgba(0,255,0,.6)'));
// });

// var x = document.getElementById("myBtn");
// x.addEventListener("click", myFunction);

$('document').ready( function() {
    var xx = document.getElementsByClassName("ui-draggable");
    for (var i = 0 ; i < xx.length; i++) {
        xx[i].addEventListener('click' , function() { alert("hi"); } , false ) ; 
     }
    
    
});


