# webUI可參考的範例

### 線上try程式碼
- [liveweave](http://liveweave.com/)
- [W3C](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default)
- [jsfiddle.net](http://jsfiddle.net/vrUgs/2/)
- [RUNOOB.COM](http://www.runoob.com/try/try.php?filename=jqueryui-example-draggable)
- [CodePen](https://codepen.io/pen/)
---

```
範例測試圖片
https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png
```

## Html
- [Add image to page onclick](https://stackoverflow.com/questions/8886248/add-image-to-page-onclick)
- [W3C Canvas to fill](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_img)
- [可以上傳圖片](https://disp.cc/b/11-8uGt)
- [Canvas畫多圖](http://www.dummies.com/web-design-development/site-development/how-to-include-images-on-your-web-page-with-html5-canvas/)
- [兩個div之間拖曳圖片](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2)
- [canvas drawImage()](http://www.html5canvastutorials.com/tutorials/html5-canvas-images/)

---

## CSS
- [CSS版面配置](http://zh-tw.learnlayout.com/position.html)


---

## JavaScript
- [對齊線](http://runjs.cn/code/7woaho1m)
- [JavaScript APIs Current Status](https://www.w3.org/standards/techs/js#w3c_all)
- [點選後, 取得滑鼠位置](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_mouse_clientxy)
- [持續追蹤滑鼠在Canvas上的位置](http://www.w3school.com.cn/tiy/t.asp?f=html5_canvas_coordinates)
- [eventListener的callback方法傳參數](http://www.jstips.co/zh_tw/javascript/passing-arguments-to-callback-functions/)
- [A Gentle Introduction to Making HTML5 Canvas Interactive](https://simonsarris.com/making-html5-canvas-useful/)
- [可拖拉上傳圖片](http://blogs.sitepointstatic.com/examples/tech/filedrag/2/index.html)
- [W3C - drag](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_draganddrop2)
- [只能在兩個區塊拖拉](http://jsfiddle.net/U2nKh/20/)
- [儲存webUI text物件內容 -> fs](http://html5-demos.appspot.com/static/a.download.html)
- [儲存webUI JSON物件 -> fs](http://jsfiddle.net/RZBbY/10/)
- [jQuery 可移動、可縮放](http://viralpatel.net/blogs/jquery-resizable-draggable-resize-drag-tutorial-example/)
- [draggable + resizable](http://jsfiddle.net/lotusgodkk/8VY52/250/)
- [JavaScript談物件實作](https://stackoverflow.com/questions/1595611/how-to-properly-create-a-custom-object-in-javascript)
- [JavaScript實作resizable+draggable](http://www.coffeegnome.net/draggable-resizable-without-jqueryui/)


## storage
- [Storing Objects in HTML5 localStorage](https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage?rq=1)
- [Storage application](http://ivanmorgillo.com/webnotes/)
- [HTML API](https://stackoverflow.com/questions/2845603/import-export-html5-localstorage-data)
- [javaScript匯出txt](http://tsangprogramlearning.blogspot.tw/2015/01/javascripttxt.html)
- [FileSaver.js](https://eligrey.com/demos/FileSaver.js/)
- [Save File with JavaScript](https://codepen.io/davidelrizzo/pen/cxsGb)
- [儲存及還原html tag by XML](https://jsfiddle.net/93ewka6w/)
- [How to convert selected HTML to Json?](https://stackoverflow.com/questions/34504050/how-to-convert-selected-html-to-json)
- [document.cookie Fiddle example](https://jsfiddle.net/25fw1sdk/)


## AJAX
- [AJAX+jQuery+PHP](http://viralpatel.net/blogs/jquery-ajax-tutorial-example-ajax-jquery-development/)


---

## jQuery
- [下拉式選單(有bug)](http://jsfiddle.net/RobinvdA/wQ8YA/34/)
- [(中文)拖動](http://www.runoob.com/jqueryui/example-draggable.html)
- [可拖動、可排序、限制範圍](http://www.pureexample.com/tw/jquery-ui/draggable-options-connect-to-sortable.html)
- [Droppable jQuery官網](http://jqueryui.com/droppable/#default)
- [新增資料by前端](http://jsfiddle.net/nkaq816f/)

## jQuery UI
- [Draggable and Resizable without jqueryUI](http://jsfiddle.net/lotusgodkk/8VY52/247/)
---

# prototype
每個js物件, 都有2個物件與之關聯
1. 原型繼承特性
2. 原型

使用object literal建立的物件都有同一個`原型物件`, 我們用`Object.prototype`來參考這個`原型物件`.

使用`new Object()創建的物件`繼承自`Object.prototype`

ex: 使用 `new Array()建立的物件` 原型為 `Array.prototype`; `new Date()建立的物件` 原型為 `Date.prototype`

而 `Object.prototype`沒有原型物件


---

Start from 2017/09/12, Tony

```mermaid
graph LR
    A --> B;
    B --> C;
    C --> A;
```