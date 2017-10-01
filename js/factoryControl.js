

/*
    場區容器的建構式
*/
function factoryState(machine) {    // 廠區Layout建構式
    
    // *** 場區狀態 ***
    this.machine = machine;
    this.width = machine.width;
    this.height = machine.height;
    this.dragging = false;  // 拖曳時, 持續追蹤
    this.machineCollections = []; // 場區所有機器設備
    this.selection = null;  //
    this.dragoffx = 0;  // 追蹤滑鼠按下及移動
    this.dragoffy = 0;
    // *** 場區狀態 ***


    // *** 場區事件 ***
    // 底下的事件都是 base on 場區、設備
    var factoryLayout = this;   // 廠區Layout狀態
    
    machine.addEventListener('selectstart', function(ev) {  // 滑鼠點選後的預設事件取消
        console.log(ev.clientX);
        ev.preventDefault();
        return false;
    }, false);


    machine.on('mousedown', function(ev) {  // 點選「場區or設備」 的啟動事件
        var mouse = factoryLayout.getMouse(ev);
        var mx = mouse.x;
        var my = mouse.y;
        var shapes = factoryLayout.shapes;
        var n = shapes.length;
        for (var i = n-1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {   // 點選設備
                var mySel = shapes[i];
                factoryLayout.dragoffx = mx - mySel.x;
                factoryLayout.dragoffy = my - mySel.y;
                factoryLayout.dragging = true;
                factoryLayout.selection = mySel;
                factoryLayout.valid = false;
                return;
            }
        }

        if (factoryLayout.selection) {  // 點選場區
            factoryLayout.selection = null;
            factoryLayout.valid = false;
        }
    }, true);


    machine.on('mousemove', function(ev) {  // 拖著設備移動的時候, valid = false;
        if (factoryLayout.dragging) {
            var mouse = factoryLayout.getMouse(ev);

            factoryLayout.selection.x = mouse.x - factoryLayout.dragoffx;
            factoryLayout.selection.y = mouse.y - factoryLayout.dragoffy;
            factoryLayout.valid = false;
        }
    }, true);


    machine.on('mouseup', function(ev) {    // 停止點選 or 停止拖拉, dragging = false;
        factoryLayout.dragging = false;
    }, true);


    machine.on('dblclick', function(ev) {
        var mouse = factoryLayout.getMouse(ev);
        factoryLayout.howToDoThis();
    }, this);

    // *** 場區事件 ***
}
    
    
factoryState.prototype.settingUp = function() {
    console.log('factoryState.prototype.settingUp!!');
    if (!this.valid) {

        console.log(this + 'this.valid');
        // 



        this.valid = true;
    }
}

factoryState.prototype.getMouse = function(ev) {    // 建立物件
    console.log('factoryState.prototype.getMouse!!')
    var element = this.machine, offsetX = 0, offsetY = 0, mx, my;

    // 計算總偏移
    if (element.offsetParent !== undefined) {

    }
}


factoryState.prototype.howToDoThis = function(machine) {
    console.log('Double Click');
}


var s = new factoryState('img');