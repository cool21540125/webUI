// Left Side button onchange=改變範例圖片
function changeImgReview() {
    document.getElementById("demo_img").src = "img/" + dir.photo.value;
    document.getElementById("demo_img").style.display = "";
}

// 新增機器by click
// https://stackoverflow.com/questions/8886248/add-image-to-page-onclick
function addMachine() {
    // Add new Canvas && Image
    var img = document.createElement("img");
    img.src = document.getElementById("myImage").src;
    img.height = 50;
    img.width = 50;

    img.setAttribute("class", "ui-draggable");

    document.body.appendChild(img);

    // Let canvas draggable by jQuery UI
    // document.body.appendChild(newImg);
    // ctx.className = "ui-draggable";
    $(".ui-draggable").draggable();
}

// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_img
function myCanvas() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);
}



// https://stackoverflow.com/questions/27629122/how-to-get-all-ids-inside-of-a-div-using-pure-javascript
// 計算畫面中有多少Canvas, 用來新增新id
// function getCanvasID() {
//     var everyChild = document.querySelectorAll("#container div");
//     for (var i = 0; i<everyChild.length; i++) {
//         everyChild[i].classList.add("anything");
//     }
// }