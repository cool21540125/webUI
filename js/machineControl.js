

$(function() {      // 機器設備可以拖拉


    // $("#m01").draggable(); // 1. 任意拖拉 OK

    
    // $("#m01").draggable({  // 2. 只能在特定範圍拖拉 OK
    //     containment: "parent"
    //     // or
    //     // containment: $('#factoryArea')
    //     // or
    //     containment: "document"
    //     // or
    //     containment: "window"
    // }); 

    
    $(".machine").draggable({   // 3. 停止時啟動事件
        grid: [10, 10],         // 拖動的時候每次移動特定距離
        cursor: 'pointer',
        containment: "parent",
        stop: handleDragStop
    })

    function handleDragStop(ev, ui) {   // 3. 拖曳停止時, 回傳物件座標
        var xi = parseInt(ui.offset.left);
        var yi = parseInt(ui.offset.top);
        
        document.getElementById('note').innerHTML = ('x: ' + xi + ', y: ' + yi);
        // $('#note').text = ('x: ' + xi + ', y: ' + yi);  // 為何不行?
        console.log('x: ' + xi + ', y: ' + yi);
    }
})


// $(function() {  // 設備事件
//     $('.machine').click(function() {
//         console.log(this);
//         // alert(typeof(this));
//     });
// })