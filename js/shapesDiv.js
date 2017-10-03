// Machine Constructor
// function MachineModel(fillImg, x, y, w, h) {
function MachineModel(pic) {
    this.img = "img/" + pic;
    this.class = "machine"
    
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



    // **** Keep track of state! ****

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
    // machine.addEventListener('selectstart', function (ev) { // preventDefault()
    //     ev.preventDefault();
    //     return false;
    // }, false);


    machine.on('mousedown', function(ev) {

        // 取消所有 'selected' 屬性
        $('#factoryArea').children().each(function() {
            this.classList.remove('selected');
            // console.log(this);
        })

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


    

    // machine.addEventListener('mousedown', function (ev) { // 
    //     // var mouse = myPlantArea.getMouse(ev);
    //     var mx = ev.clientX;
    //     var my = ev.clientY;
    //     var machines = myPlantArea.machines;
    //     var n = machines.length;
    //     for (var i = n - 1; i >= 0; i--) {
    //         if (Machines[i].contains(mx, my)) {
    //             var mySel = Machines[i];

    //             // move smoothly
    //             myPlantArea.dragoffx = mx - mySel.x;
    //             myPlantArea.dragoffy = my - mySel.y;
    //             myPlantArea.dragging = true;
    //             myPlantArea.selection = mySel;
    //             myPlantArea.valid = false;
    //             return;
    //         }
    //     }
    //     // havent returned means we have failed to select anything.
    //     // If there was an object selected, we deselect it
    //     if (myPlantArea.selection) {
    //         myPlantArea.selection = null;
    //         myPlantArea.valid = false; // Need to clear the old selection border
    //     }
    // }, true);



    // double click for making new machines
    // machine.addEventListener('dblclick', function (ev) {
    //     // var mouse = myPlantArea.getMouse(ev);
    //     // myPlantArea.addMachine(new MachineModel(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)'));
    //     var area = document.getElementById('factoryArea');
    //     var s = new PlantArea(area);
    //     s.addMachine(new MachineModel('1.jpg'));

    // }, true);

    machine.one('dblclick', function(ev) {
        // console.log('dblclick');
        ev.preventDefault();
    })


    // machine.addEventListener('mouseup', function (ev) {
    //     myPlantArea.dragging = false;
    // }, true);



    machine.on('mousemove', function(ev) {
        if (myPlantArea.dragging) {     // record (X, Y) when mousedown + mousemove
            var mouse = myPlantArea.getMouse(ev);
            
            myPlantArea.selection.x = mouse.x - myPlantArea.dragoffx;
            myPlantArea.selection.y = mouse.y - myPlantArea.dragoffy;
            myPlantArea.valid = false; // Something's dragging so we must redraw
            console.log(ev.target);
        }
        
    });

    // // **** Options! ****
    // this.selectionColor = '#CC0000';
    // this.selectionWidth = 2;
    // this.interval = 30;
    // setInterval(function () {
    //     myPlantArea.draw();
    // }, myPlantArea.interval);
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



// PlantArea.prototype.clear = function () {
//     this.ctx.clearRect(0, 0, this.width, this.height);
// }



// 重畫canvas
// PlantArea.prototype.draw = function () {
//     if (!this.valid) {
//         var ctx = this.ctx;
//         var Machines = this.Machines;
//         this.clear();


//         // 畫所有機器到廠區
//         var l = Machines.length;
//         for (var i = 0; i < l; i++) {
//             var Machine = Machines[i];
//             // 廠區外機器, 免重畫
//             if (Machine.x > this.width || Machine.y > this.height ||
//                 Machine.x + Machine.w < 0 || Machine.y + Machine.h < 0) continue;
//             Machines[i].draw(ctx);
//         }

//         // 設備邊緣
//         if (this.selection != null) {
//             ctx.strokeStyle = this.selectionColor;
//             ctx.lineWidth = this.selectionWidth;
//             var mySel = this.selection;
//             ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
//         }

//         this.valid = true;
//     }
// }



// mouse position relative to the state's machine
PlantArea.prototype.getMouse = function (ev) {
    var element = this.machine,
        offsetX = 0,
        offsetY = 0,
        mx, my;

    // total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element == element.offsetParent));
    }

    // Add padding, border style widths to offset, position:fixed bar to offset
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = ev.pageX - offsetX;
    my = ev.pageY - offsetY;

    return { x: mx, y: my };
}



$(document).ready(function() {
    var area = $('#factoryArea');
    var s = new PlantArea(area);

    s.addMachine(new MachineModel("1.jpg"));
    s.addMachine(new MachineModel("2.jpg"));
})
