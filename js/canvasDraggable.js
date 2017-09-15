/*
    https://simonsarris.com/
*/

// Constructor for Shape objects to hold data for all drawn objects.
function Shape(x, y, w, h, fill) {
    // This is a very simple and unsafe constructor. All we're doing is checking if the values exist.
    // "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
    // But we aren't checking anything else! We could put "Lalala" for the value of x 
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
}

// Draws this shape to a given context
Shape.prototype.draw = function (ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

Shape.prototype.contains = function (mx, my) {
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
    return (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
}

function canvasState(canvas) {

    // 記錄canvas上面的一切資訊
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');     // canvasState上面展開畫布

    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }

    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    this.valid = false; // when set to false, the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;

    // **** Events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    myState = this;                         // canvasState -> myState


    // 使double click事件在canvas無效
    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

    // Up, down, and move are for dragging
    // mousedown -> 抓取滑鼠位置, 判斷是否有選到物件
    canvas.addEventListener('mousedown', function (ev) {
        var mouse = myState.getMouse(ev);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = myState.shapes;
        var q = shapes.length;
        for (var i = q - 1; i >= 0; i--) {     // 逐一繞行canvasState內所有物件, 尋找是否存在滑鼠指標
            if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];
                myState.dragoffx = mx - mySel.x;    // 
                myState.dragoffy = my - mySel.y;    // 
                myState.draging = true;             // 拖曳狀態
                myState.selection = mySel;          // 
                myState.valid = false;              // 
                return;
            }
        }

        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        // 若已選擇物件 -> 取消選擇
        if (myState.selection) {
            myState.selection = null;
            myState.valid = false;      // Need to clear the old selection border
        }
        // true: capturing phase
    }, true);

    canvas.addEventListener('mousemove', function (ev) {
        if (myState.dragging) {
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false;      // Something's dragging so we must redraw
        }
    }, true);

    // 放掉滑鼠時 -> 取消拖曳狀態
    canvas.addEventListener('mouseup', function (ev) {
        myState.dragging = false;
    }, true);

    // 雙擊時, 建立新物件
    canvas.addEventListener('dblclick', function (ev) {
        var mouse = myState.getMouse(ev);
        //@@
        myState.addShape(new Shape(mouse.x, mouse.y, 20, 20, 'rgba(0,255,0,.6)'));
    }, true);

    // **** Options! ****
    // 選取時的狀態
    this.selectionColor = 'rgb(CC, 0, 0)';
    this.selectionWidth = 2;
    this.interval = 30;                 // 50毫秒偵測一次
    setInterval(function () { myState.draw(); }, myState.interval);
}

canvasState.prototype.addShape = function (shape) {
    this.shapes.push(shape);
    this.valid = false;
}

canvasState.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
// draw持續每間格interval被呼叫
canvasState.prototype.draw = function () {
    // if our state is invalid, redraw and validate!
    if (!this.valid) {
        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **

        // draw all shapes
        var q = shapes.length;
        for (var i = 0; i < q; i++) {
            var shape = shapes[i];

            // We can skip the drawing of elements that have moved off the screen:
            // skip掉畫面外的元素
            if (shape.x > this.width || shape.y > this.height || shape.x + shape.w < 0 || shape.y + shape.h < 0) {
                continue;
            }
            shapes[i].draw(ctx);
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected Shape
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



// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
canvasState.prototype.getMouse = function (ev) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    // 加入padding & border width來做offset
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = ev.pageX - offsetX;
    my = ev.pageY - offsetY;

    // test
    console.log('x='+mx+', y='+my);

    // return javascript object (a hash) with x and y defined
    return { x: mx, y: my };
}

// If you dont want to use <body onLoad='init()'>
  // You could uncomment this init() reference and place the script reference inside the body tag

function init() {
    var s = new canvasState(document.getElementById('InitCanvas')); //取得畫布
    s.addShape(new Shape(1, 3, 5, 5, 'rgba(127, 255, 212, .5)'));
}

window.addEventListener('load', init, false);