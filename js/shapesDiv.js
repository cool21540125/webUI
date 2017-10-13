// Machine Constructor
function MachineModel(pic, width, height) {
    this.img = "img/" + pic;
    this.class = "machine";
    this.width = width;
    this.height = height;
}


// Draws this MachineModel to a given context
MachineModel.prototype.draw = function (ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}


// Determine if a point is inside the MachineModel's bounds
MachineModel.prototype.contains = function (mx, my) {
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the MachineModel's X and (X + Width) and its Y and (Y + Height)
    return (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
}


// PlantArea
function PlantArea(machine) {

    this.machine = machine;
    this.width = machine.css('width');  //this.width = machine.width()
    this.height = machine.css('height');

    // this.width = machine.style.width; // jQ $('machine').attr('width');
    // this.height = machine.style.height;

    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop; // 0
    this.htmlLeft = html.offsetLeft; // 0

    this.valid = false; // redraw when drag
    this.machines = []; // all machines
    this.dragging = false; // track co-ordinate flag
    this.selection = null; // the selected machine
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;

    // 對 machine 設定事件
    // 原先 this 指 PlantArea, 
    // 啟動事件後, this 指 machine

    var myPlantArea = this; // PlantArea

    machine.on('select', function(ev) {
        console.log('select')
        ev.preventDefault();
        return false;
    });



    machine.on('mousedown', function(ev) {

        // console.log(ev.target);
        // 取消所有 'selected' 屬性
        $('#factoryArea').children().each(function() {
            this.classList.remove('selected');
            // console.log(this);
        })

        // 在廠區做點選的時候, 並非點到廠區(就是點到機器)
        if (ev.target != $('#factoryArea')[0]) {
            if (!ev.target.classList.contains('selected')) {
                ev.target.classList.add('selected');
                this.selection = true;
            }

            console.log(ev.target);
        }
    })



    machine.on('mouseup', function(ev) {
        // console.log('mouseup');
    });




    machine.one('dblclick', function(ev) {
        // Add new machine when double click
        // console.log(ev.target);
        // var mouse = myPlantArea.getMouse(ev);

        console.log('(' + ev.clientX + ', ' + ev.clientY + ')');
        // console.log();
    })



    machine.on('mousemove', function(ev) {
        if (myPlantArea.dragging) {     // record (X, Y) when mousedown + mousemove
            var mouse = myPlantArea.getMouse(ev);
            
            myPlantArea.selection.x = mouse.x - myPlantArea.dragoffx;
            myPlantArea.selection.y = mouse.y - myPlantArea.dragoffy;
            myPlantArea.valid = false; // Something's dragging so we must redraw
            console.log(ev.target);
        }
        
    });
}



PlantArea.prototype.addMachine = function (machine) {
    this.machines.push(machine);
    this.valid = false;
    var q1 = document.createElement('img');
    q1.src = machine.img;
    q1.className = machine.class;
    var factoryArea = document.getElementById('factoryArea');
    factoryArea.appendChild(q1);
}



$(document).ready(function() {
    var area = $('#factoryArea');
    var s = new PlantArea(area);

    s.addMachine(new MachineModel("1.jpg"));
    s.addMachine(new MachineModel("2.jpg"));
    $('#saveOut').on('click', saveOutFactoryStatus);
})


// 狀態儲存
function saveOutFactoryStatus() {

    var machine1 = $('#factoryArea').children()[0];
    var machine2 = $('#factoryArea').children()[1];
    
    var m1 = new Machine(machine1.height, machine1.width);

    console.log(m1);
    
}



function Machine(height, width, top, left) {
    this.height = height;
    this.width = width;
}



Machine.prototype.toString = function() {
    return 'Machine size is ( ' + this.height + 'x ' + this.width + ').'
}


