
// ●●● main function
$(function () {
	restoreLayoutSessionStorage(); 						//  Restore previous layout

	$('.DIOModel').draggable({								//  .DIOModel draggable + resizable
		accept: $('#layout'),
		revert: true,
		grid: [10, 10],
		helper: function (ev) {
			return $(ev.target.outerHTML);
		},
		start: function (ev, ui) {
			originalDIOModelBorderCSS = $(ui.draggable).css('border');
			$(ui.draggable).css('border', '1px dashed red');	// 拖入放置前, 改變#layout 邊框
		},
		stop: function (ev, ui) {
			$(ui.draggable).css('border', '1px solid gray');	// 拖入放置後, 還原#layout 邊框

			$(ev.target).css('id', )
			layoutSessionStorage(ev, ui);	// ev.target === '.DIOModel'
		},
	});


	makeDIODraggable();


	$("#layout").resizable({								//  #layout resizable + droppable
		scroll: true,
		grid: [30, 30],
		ghost: true,
		// animate: true,
		// helper: 'helper',
		stop: layoutSessionStorage,			// store status after resize layout
		resize: function (ev, ui) {
			$('#info').text('top= ' + ui.position.top + ', left= ' + ui.position.left + ', width= ' + ui.size.width + ', height ' + ui.size.height);
		}

	}).droppable({
		helper: 'clone',
		classes: 'hover',
		grid: [20, 20],
		// over: function (ev, ui) {			// above droppable area
		// 	$(ev.target).css('border', '3px dashed blue');
		// },
		// out: function (ev, ui) {			// leave droppable area
		// 	$(ev.target).css('border', '3px solid gray');
		// },
		drop: function (ev, ui) {
			// console.log('drag .DIOModel -> #layout: 先觸發#layout droppable.stop(), 再觸發.DIOModel draggable.stop()');
			if (ui.helper[0].parentNode.id === 'DIOModelList') {

				var q = $(ui.draggable).clone()
				q[0].classList.add('DIO')
				q[0].classList.remove("DIOModel");

				q.attr('id', 'DIO' + getDIOID());

				$(ev.target).append(q);

				// var iid = idChecker(); //@@ 新增DIO的id

				$(q[0]).css({ 'position': 'absolute', 'left': ev.offsetX, 'top': ev.offsetY });

				makeDIODraggable(ev, ui);


			}
			$(ev.target).css('border', '3px solid gray');

			// layoutSessionStorage(ev, ui);	// ev.target === '#layout'
		},
	});
});


function getDIOID() {
	var p = sessionStorage.getItem('layoutStatus');
	var ss;
	if (p === null) {
		return 0;
	} else if (( ss = JSON.parse(p).objects)[0] !== '' ) {

	} else if (ss[0] === ""){
		return 0;

	} else {
		return ss.length;

	}
}


function makeDIODraggable(ev, ui) {	//draggable + resizable by jQuery UI

	// ### Layout resizable + droppable


	var zindex = 1;
	// ### DIO draggable + resizable
	$('.DIO').draggable({
		// handle: '.handler',
		cursor: 'move',
		revert: 'invalid',
		snap: true,
		snapMode: 'outer',
		snapTolerance: 5,
		containment: 'parent',
		scroll: false,
		grid: [10, 10],
		stop: layoutSessionStorage,			// store status after drag DIO
		start: function () {
			$(this).css("z-index", zindex++);
			console.log();
		}

	}).resizable({
		// alsoResize: pic,
		stop: layoutSessionStorage,			// store status after resize DIO
		alsoResize: $(this).children(),
		resize: function (ev, ui) {
			console.log();

		}
	});
}

// function makeDIOResizable(ev, ui) {
// 	$('.DIO').resizable({
// 		// alsoResize: pic,
// 		stop: layoutSessionStorage,			// store status after resize DIO
// 		alsoResize: $(this).children(),
// 	})
// }




function layoutSessionStorage(ev, ui) { // Execute when stop dragging
	// Store DIO property
	var o; // DIO
	var p; // 廠房物件
	var oo; // 物件 + sessionStorage('layout')組成之字串
	var h, w; // DIO長寬
	var ph, pw; // 廠房物件長寬


	if (ev.target.classList.contains('ui-draggable')) { // 事件由DIO trigger
		w = ev.target.offsetWidth;
		h = ev.target.offsetHeight;
		pw = ev.target.parentElement.offsetWidth;
		ph = ev.target.parentElement.offsetHeight;
		o = {
			"id": ev.target.id,
			"top": ev.target.offsetTop,
			"left": ev.target.offsetLeft,
			"width": w,
			"height": h,
			"html": ev.target.outerHTML,
		}
		/*	DEBUG用
		var q = $('#machine0')[0]
		o = {
			"id": q.id,
			"top": q.offsetTop,
			"left": q.offsetLeft,
			"width": w,
			"height": h,
		}
		*/

	} else { // 事件由廠區物件trigger
		pw = ev.target.offsetWidth;
		ph = ev.target.offsetHeight;
		o = "";
	}



	/*
	@@ 效能不佳: 若已有storage, 再拖動廠區, 則免再判斷是否已有storage
	
	日後改寫 
	*/
	p = {
		"id": "plantLayout",
		"author": "(UserName)",
		"width": pw,
		"height": ph,
		"objects": function (ev, o) {
			var s = JSON.parse(sessionStorage.getItem('layoutStatus'));

			if (s === null || s.objects === undefined) { // 首次執行時, 無session
				return [o];

			} else {
				var mm = s.objects;
				if (mm[0] === "") { // 有storage, 無objects的狀態
					return [o];

				} else {
					if (ev.target.classList.contains('ui-draggable')) { // 1.有storage, 有objects, 且拖動物件為DIO
						for (var i = 0; i < mm.length; i++) { // 尋找同id的objects
							if (o.id === s.objects[i].id) {
								s.objects[i]['id'] = o.id;
								s.objects[i]['top'] = o.top;
								s.objects[i]['left'] = o.left;
								s.objects[i]['width'] = o.width;
								s.objects[i]['height'] = o.height;
								s.objects[i]['html'] = o.html;
								return s.objects;
							}
						}

						// 新增1筆
						s.objects.push(o);
						return s.objects;

					} else { // 2.有storage, 有objects, 拖動物件非為DIO
						return s.objects;

					}
				}

				var s = JSON.parse(sessionStorage.getItem('layoutStatus'));
				var newDIOStatus = {};
			}
		}(ev, o)
	}

	debugPrint(p, ev, ui);
	sessionStorage.setItem('layoutStatus', JSON.stringify(p));
}

function debugPrint(p, ev, ui) {
	var str = '';
	for (var i = 0; i < p.objects.length; i++) {
		str += '\tid= ' + p.objects[i].id + ',\t(top, left, height, width)= (' + p.objects[i].top + ', ' + p.objects[i].left + ', ' + p.objects[i].height + ', ' + p.objects[i].width + ')\n';
	}
	console.log('ev.target.id= ' + ev.target.id + '\n' + 'ui.helper[0].id= ' + ui.helper[0].id + '\n' +
		'p.objects.length= ' + p.objects.length + '\n' + str);
	console.log();
}

function restoreLayoutSessionStorage() { // Restore previous layout
	/* 作3件事情:
	1. 還原場區大小
	2. 還原場區物件
	3. 還原場區物件大小及位置
	@@BUG: top, left為不正確的top, left, 需搭配offsetTop, clientTop, 等等來計算真實的top, left
	*/

	var p; // Layout storage
	if ((p = JSON.parse(sessionStorage.getItem('layoutStatus'))) !== null) { // storage為非空值 -> 嘗試作還原
		try {
			// 1. 還原場區大小
			$('#layout').css('width', p.width); // restore layout width
			$('#layout').css('height', p.height); // restore layout height

			var ss = p.objects; // DIO storage
			if (ss[0] !== "") {	// storage內找不到可還原的物件則結束
				for (var j = 0; j < ss.length; j++) { // Restore DIO one by one

					var a = $(ss[j].html); // 還原為 html -> 抓出內部結構(jQuery物件), 取[0]後可變回javaScript物件

					// 2. 還原場區物件
					a.appendTo('#layout');

					// 3. 還原場區物件大小及位置
					a.css('top', ss[j].top);
					a.css('left', ss[j].left);
					a.css('width', ss[j].width);
					a.css('height', ss[j].height);
				}
				// makeDIOResizable();
			}
		} catch (err) {
			console.log('Error happened when restore sessionStorage');
		}
	}
}