

// 新增機器by click
function addMachine() {
    // Add new canvas
    var machine = document.createElement("canvas");
    var ctx = machine.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("New machine", 10, 30);
    machine.className = "ui-draggable";
    
    // Let canvas draggable by jQuery UI
    var initCanvas = document.getElementById("InitCanvas");
    initCanvas.appendChild(machine);
    // document.body.appendChild(machine);
    $(".ui-draggable").draggable();
}

// 改變範例圖片
function changeImgReview() {
    document.getElementById("demo_img").src = "img/"+dir.photo.value; 
    document.getElementById("demo_img").style.display = ""; 
}


function aa() {
    document.getElementById("demo_img").innerHTML="<img src='images/aftersurprise.png' />";

}



