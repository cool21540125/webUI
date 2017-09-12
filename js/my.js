// 點選後, 新增新的機台
function addNew() {

    var machine = document.createElement("div");
    var t = document.createTextNode("新機器");
    machine.appendChild(t);
    machine.className = "ui-draggable";
    document.body.appendChild(machine);

    $(".ui-draggable").draggable();

}
