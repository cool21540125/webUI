var imgSrc = "";



// ●●● main function
$(function () {
	restoreLayoutSessionStorage(); 						// 1. Restore previous layout

	operateDIO(); 										// 2. addEvent: Plant objects draggable + resizable + droppable

	$('#uu').on('change', uploadHandler);			// 3. 點選模型, 選擇圖片, 按確定後附加到網頁上供佈置


	// $('handler').css('overflow', 'hidden');
	// $('.machineClass').css('position', 'absolute');
	// $('.machineClass').css('overflow', 'auto');


	// $('nav#menu').mmenu(); //左方選單

	// $('.hrefList').on('click', function (ev) { // 超連結失效
	// 	ev.preventDefault();
	// 	ev.stopPropagation();
	// })
});



function checkID() {	// 判斷要付加上去的element ID
	var p;
	JSON.parse(sessionStorage.getItem('layoutStatus'));
	if ((p = JSON.parse(sessionStorage.getItem('layoutStatus'))) !== null) { // storage為非空值 -> 嘗試作還原
		try {
			var ss = p.objects; // DIO storage
			if (ss[0] !== "") {	// storage內找不到可還原的物件則結束
				for (var j = 0; j < ss.length; j++) { // Restore DIO one by one

				}
			}
		} catch (err) {
			console.log('Error happened when restore sessionStorage checkID()');
		}
	}
	return 0;
}



function restoreLayoutSessionStorage() { // Restore previous layout
	/* 作3件事情:
	1. 還原場區大小
	2. 還原場區物件
	3. 還原場區物件大小及位置
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
			}
		} catch (err) {
			console.log('Error happened when restore sessionStorage');
		}
	}
}



function addMachine(ev) { // Draggable!  圖片src放入layout
	if (ev != null && imgSrc != "") {

		var idController = checkID();

		var machine = "#machine" + idController;
		var pic = "#machinePic" + idController;

		var appendString =
			'<div class="machineClass row-sm-1" id="machine' + idController + '">' +
			'<div class="handler">' + '<<HandlerName>>' + '</div>' +
			'<img src="' + imgSrc + '" id="machinePic' + idController + '" ' +
			'class="machinePhoto" style="width:160px;height:120px;margin: 0px;" ondblclick="headerClick()">' +
			'</div>';

		/* 附加字串的結構
		<div class="machineClass" id="machine<i>">
			<div class="handler"></div>
			<img src="..." id="machinePic<i>" class="machinePhoto" ondblclick="headerClick()" />
		</div>  */
		$('#layout').append(appendString);


		// @
		$(".machineClass").css("position", "absolute");
		$(".machineClass").on('click', function (ev) {
			$(this).css('zIndex', 2);
		})
		operateDIO(ev);

		imgSrc = "";
	}
}



function operateDIO(ev) {	//draggable + resizable by jQuery UI
	// 1. DIO draggable + resizable
	$('.machine').draggable({
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
	}).resizable({
		// alsoResize: pic,
		stop: layoutSessionStorage,			// store status after resize DIO
	});

	// 2. layout resizable + droppable
	$("#layout").resizable({
		stop: layoutSessionStorage,			// store status after resize layout
	}).droppable({
		over: function() {
			ev.preventDefault();
		},
		out: addMachine,

	});


	// 3. DIO model draggable
	$('.machineClass').draggable({
		accept: $('#layout'),
		start: function() {
			imgSrc = event.target.src;		// 
			console.log('開始移動.machine -> #layout');
		},
		stop: addMachine,					// 
	});

	// 4. DIO
}



function layoutSessionStorage(ev, obj) { // Execute when stop dragging
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
	// console.log(JSON.parse(sessionStorage.getItem('layoutStatus')));
	// sessionStorage.setItem('layoutStatus', JSON.stringify(p));
}



// function dragStart(ev) {
// 	imgSrc = ev.target.src;
// }


// function asideSection() { //左側打勾控制開始 , 暫無功能
// 	function onChecked(num) {
// 		var target = ".choose" + num;

// 		if ($(target).css("opacity") == 1) {
// 			$(target).fadeTo(300, 0);
// 		} else {
// 			$(target).fadeTo(300, 1);
// 		}
// 	}

// 	function mosIn(num) {
// 		var target = ".checkFont" + num;
// 		$(target).css("font-weight", 900);
// 		$(target).css("color", "#FF0000");
// 	}

// 	function mosOut(num) {
// 		var target = ".checkFont" + num;
// 		$(target).css("font-weight", 500);
// 		$(target).css("color", "#000000");
// 	}
// }



// function headerClick() { //叫出選單的function
// 	$("#header").click();
// }



// function AllowDrop(event) {
// 	event.preventDefault();
// }



function updateFile() {
	$("#uu").click();
}



function uploadHandler() {	// 判斷所選圖片, 符合條件的話附加到網頁上
	if (this.files[0].type == 'image/jpeg' || 'image/jpg' || 'image/bmp' || 'image/png') {
		var file = this.files[0];
		var fr = new FileReader();
		fr.onload = function () {
			var img = event.target.result;
			$('#imgDIV').append('<img src="' + img + '" class="machine" />');
		}
		fr.readAsDataURL(file);

	} else {
		alert("Only allowed: jpeg/jpg/bmp/png");
	}
}