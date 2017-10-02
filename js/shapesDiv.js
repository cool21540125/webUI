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

    });
    // machine.addEventListener('selectstart', function (ev) { // preventDefault()
    //     ev.preventDefault();
    //     return false;
    // }, false);



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


    // machine.addEventListener('mouseup', function (ev) {
    //     myPlantArea.dragging = false;
    // }, true);



    machine.on('mousemove', function(ev) {
        console.log(ev.target);
    });
    // machine.addEventListener('mousemove', function (ev) {
    //     if (myPlantArea.dragging) {
    //         var mouse = myPlantArea.getMouse(ev);
    //         // We don't want to drag the object by its top-left corner, we want to drag it
    //         // from where we clicked. Thats why we saved the offset and use it here
    //         myPlantArea.selection.x = mouse.x - myPlantArea.dragoffx;
    //         myPlantArea.selection.y = mouse.y - myPlantArea.dragoffy;
    //         myPlantArea.valid = false; // Something's dragging so we must redraw
    //     }
    // }, true);











    // machine.addEventListener('click', function (ev) {
    //     console.log('test');
    // }, true);



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



PlantArea.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
}



// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the machine gets invalidated by our code
PlantArea.prototype.draw = function () {
    // if our state is invalid, redraw and validate!
    if (!this.valid) {
        var ctx = this.ctx;
        var Machines = this.Machines;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **

        // draw all Machines
        var l = Machines.length;
        for (var i = 0; i < l; i++) {
            var Machine = Machines[i];
            // We can skip the drawing of elements that have moved off the screen:
            if (Machine.x > this.width || Machine.y > this.height ||
                Machine.x + Machine.w < 0 || Machine.y + Machine.h < 0) continue;
            Machines[i].draw(ctx);
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected Machine
        if (this.selection != null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            var mySel = this.selection;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }

        // ** Add stuff you want drawn on top all the time here **

        this.valid = true;
    }
}



// Creates an object with x and y defined, set to the mouse position relative to the state's machine
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
PlantArea.prototype.getMouse = function (ev) {
    var element = this.machine,
        offsetX = 0,
        offsetY = 0,
        mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element == element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = ev.pageX - offsetX;
    my = ev.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {
        x: mx,
        y: my
    };
}



// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();

function init() {
    // var area = document.getElementById('factoryArea');
    var area = $('#factoryArea');
    var s = new PlantArea(area);

    s.addMachine(new MachineModel("1.jpg"));
    s.addMachine(new MachineModel("2.jpg"));
    // s.addMachine(new Machine(40, 40, 50, 50)); // The default is gray
    // s.addMachine(new Machine(60, 140, 40, 60, 'lightskyblue'));
    // // Lets make some partially transparent
    // s.addMachine(new Machine(80, 150, 60, 30, 'rgba(127, 255, 212, .5)'));

}


window.addEventListener('load', init, false);

// $(function () {
//     $('#saveOut').click(function () {
//         var qq = document.getElementById('factoryArea')
//         console.log(qq);
//     });
// });


