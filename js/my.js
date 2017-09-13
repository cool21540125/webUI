

// 新增機器by click
function addMachine() {
    // Add new canvas
    var machine = document.createElement("canvas");
    var ctx = machine.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("New machine", 10, 30);
    
    // Let canvas draggable by jQuery UI
    machine.className = "ui-draggable";
    $(".ui-draggable").draggable();

    document.body.appendChild(machine);
}

