// Left Side button onchange=改變範例圖片
function changeImgReview() {
    document.getElementById("imgPrototype").src = "img/" + document.getElementById("selectPrototype").value;
}

// 新增機器by click
function addMachine() {
    var s = 50;
    // Add new Canvas, drawImage on canvas
    var c = document.createElement("canvas");
    c.height = s;
    c.width = s;
    var ctx = c.getContext("2d");

    // Draw image
    var img = document.getElementById("imgPrototype");
    ctx.drawImage(img, 0, 0, s, s);

    // Append canvas && let it draggable
    var factoryArea = document.getElementById('FactoryArea0');

    factoryArea.appendChild(c);
    c.className = "ui-draggable";
    $(".ui-draggable").draggable();
}







