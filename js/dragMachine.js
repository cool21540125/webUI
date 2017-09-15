

// https://stackoverflow.com/questions/15036386/make-image-drawn-on-canvas-draggable-with-javascript



function addMachine2() {
    var s = 50;     // image size
    // Add new Canvas, drawImage on canvas
    var canvas = document.createElement("canvas");

    var ctx = canvas.getContext("2d");
    ctx.height=s;
    ctx.width=s;
    // // Draw image on canvas
    var imgSource = document.getElementById("prototypeImage").src;
    // ctx.drawImage(img, 0, 0, s, s);

    // // Append canvas && let it draggable
    document.body.appendChild(canvas);
    // canvas.className = "ui-draggable";
    // $(".ui-draggable").draggable();


    var img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0, s, s);
    };
    img.src = imgSource;

    // var canvas = document.getElementById("InitCanvas");
    // var ctx = canvas.getContext("2d");

    var canvasOffset = $("#InitCanvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var isDragging = false;

    function handleMouseDown(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // set the drag flag
        isDragging=true;
      }
  
      function handleMouseUp(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // clear the drag flag
        isDragging=false;
      }
  
      function handleMouseOut(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // user has left the canvas, so clear the drag flag
        //isDragging=false;
      }
  
      function handleMouseMove(e){
        canMouseX=parseInt(e.clientX-offsetX);
        canMouseY=parseInt(e.clientY-offsetY);
        // if the drag flag is set, clear the canvas and draw the image
        if(isDragging){
            // ctx.clearRect(0,0,canvasWidth,canvasHeight);
            ctx.drawImage(img,0,0,s,s   );
            // ctx.drawImage(img,canMouseX-128/2,canMouseY-120/2,128,120);
        }
      }
  
      $("#canvas").mousedown(function(e){handleMouseDown(e);});
      $("#canvas").mousemove(function(e){handleMouseMove(e);});
      $("#canvas").mouseup(function(e){handleMouseUp(e);});
      $("#canvas").mouseout(function(e){handleMouseOut(e);});
}

