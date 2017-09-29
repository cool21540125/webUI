
$( function() { // eventListener
    var currentParent;

    $( "#factoryArea" ).mousemove(function(ev) {    // 資訊列顯示廠區座標
        // $( '#note' ).text(ev.pageX + ", " + ev.pageY);
    })
});






function factoryState(obj) {    // 廠區Layout建構式
    var factoryLayout = this;   //廠區Layout狀態
    this.dragging = false;  // 拖曳時, 持續追蹤
    this.machines = []; // 機器設備s
    this.selection = null;  //
    this.dragoffx = 0;  // 追蹤滑鼠按下及移動
    this.dragoffy = 0;


    obj.on('select', function(ev) {    // 開始selectstart
        console.log(ev.clientX);
    });

    obj.on('mousedown', function(ev) {  // 滑鼠按下去

    });




}
