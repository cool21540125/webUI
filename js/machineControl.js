

$(function() {      // 機器設備可以拖拉
    
    $(".machine").draggable({   // 3. 停止時啟動事件
        grid: [10, 10],         // 拖動的時候每次移動特定距離
        cursor: 'pointer',
        containment: "parent",
        stop: handleDragStop
    });

    // $(".machine").resizable();

    // $(".ui-wrapper").draggable({
    //     grid: [10, 10],         // 拖動的時候每次移動特定距離
    //     cursor: 'pointer',
    //     containment: "parent",
    //     stop: handleDragStop
    // })



    // $('.machine').resizable();

    function handleDragStop(ev, obj) {   // 3. 拖曳停止時, 回傳物件座標
        var xi = parseInt(obj.offset.left);
        var yi = parseInt(obj.offset.top);
        
        document.getElementById('note').innerHTML = ('x: ' + xi + ', y: ' + yi);
        // $('#note').text = ('x: ' + xi + ', y: ' + yi);  // 為何不行?
        // console.log('x: ' + xi + ', y: ' + yi);
    }
})