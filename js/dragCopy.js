
// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

$(document).ready(function(){
    $(".objectDrag").draggable({helper:'clone'});  

    $("#garbageCollector").droppable({
        accept: ".objectDrag",
        drop: function(event,ui){
                console.log("Item was Dropped");
                $(this).append($(ui.draggable).clone());
            }
    });

});