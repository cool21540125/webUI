	var imgSrc = "";
	var count = 0;




	// main function
	$(function () {
		restoreSessionStorage(); // 重新載入上次storage

		$('#clickimg').on('change', updateHandler);

		// $('nav#menu').mmenu(); //左方選單


		$('.hrefList').on('click', function (ev) { // 超連結失效
			ev.preventDefault();
			ev.stopPropagation();
		})


		$("#layout").resizable({ // 縮放廠區結束後, storeStatus()
			stop: storeStatus,
		});


	});


	function restoreSessionStorage() { // Restore property when load
		// Restore property when load

		/*
		var p = JSON.parse(sessionStorage.getItem('layoutStatus'));
		var ss = p.objects;
		var j = 0;
		var f = '<div class="machineClass row-sm-1" id="' + ss[j].id + '" style="padding:0px;">' +
						'<div class="handler">Container1</div>' +
						'<img src="' + imgSrc + '" id="machinePic' + j + '" class="machineIn" draggable="true" style="width:' + ss[j].width + 'px;height:' + ss[j].height + 'px;margin: 0px;" ondblclick="headerClick()">' +
						'"</div>';
		$('#layout')
		$('#machine0')

		*/

		var p; // layout storage
		if ((p = JSON.parse(sessionStorage.getItem('layoutStatus'))) !== null) { // storage為非空值 -> 嘗試作還原
			try {
				var ss = p.objects; // DIDOObjects storage
				if (ss[0] !== "") {
					for (var j = 0; j < ss.length; j++) { // Restore property one by one element

						console.log('');

						var a = $(ss[j].html); // 還原為 html -> 抓出內部結構(jQuery物件), 取[0]後可變回javaScript物件

						a.appendTo('#layout'); // storage 還原到廠區

						// 物件以還原, 但是內部屬性仍得個別執行才能還原
						a.css('top', ss[j].top);
						a.css('left', ss[j].left);
						a.css('width', ss[j].width);
						a.css('height', ss[j].height);

					}
				}

				$('#layout').css('width', p.width); // restore layout width
				$('#layout').css('height', p.height); // restore layout height

				// $(function () {
					controlDiv(); // draggable

					// 還原後, machine resizable
					// $('.machineClass').resizable({
					// 	// alsoResize: pic,
					// 	stop: storeStatus,
					// });
				// }())





			} catch (err) {
				console.log('Error happened when restore sessionStorage');
			}
		}
	}

	function updateFile() {
		$("#clickimg").click();
	}

	function dropHandler(ev) { //ev 為 DragEvent 物件
		ev.preventDefault();
		$("#machine").css("background-color", "white");
		var files = ev.dataTransfer.files; //由DataTransfer物件的files屬性取得檔案物件

		for (var i in files) {
			if (files[i].type == 'image/jpeg' || 'image/jpg' || 'image/bmp' || 'image/png') {
				//將圖片在頁面預覽
				var fr = new FileReader();
				fr.onload = openfile;
				fr.readAsDataURL(files[i]);
			} else {
				alert("只能傳圖片");
			}
		}
	}

	function updateHandler() {
		if (this.files[0].type == 'image/jpeg' || 'image/jpg' || 'image/bmp' || 'image/png') {
			var file = this.files[0];
			var fr = new FileReader();
			fr.onload = openfile;
			fr.readAsDataURL(file);
		} else {
			alert("只能傳圖片");
		}
	}

	function dragStart(ev) {
		imgSrc = ev.target.src;
	}

	function openfile(ev) {
		if ($("#imgDIV > img").size() == 5) {
			alert("最多只能新增五張圖片");
			return;
		}
		var img = ev.target.result;
		$('#imgDIV').append(
			"<img src='" + img + "' class='machine' draggable='true' ondragstart='dragStart(event)' ondragend='addMachine()'>"
		);
	}

	function AllowDrop(event) {
		event.preventDefault();
	}

	function addMachine(ev) { // Draggable!  圖片src放入layout
		if (ev != null && imgSrc != "") {
			var machine = "#machine" + count;
			var pic = "#machinePic" + count;
			/*
			'<div class="machineClass row-sm-1" id="' + ss[j].id + '" style="padding:0px;">' +
			'<div class="handler">Container1</div>' +
			'<img src="' + imgSrc + '" id="machinePic' + j + '" class="machineIn" draggable="true" style="width:' + ss[j].width + 'px;height:' + ss[j].height + 'px;margin: 0px;" ondblclick="headerClick()">' +
			'"</div>'; 
			*/
			$('#layout').append(
				"<div class='machineClass row-sm-1' id='machine" + count + "' style='padding:0px;'>" +
				"<div class='handler'>Container1</div>" +
				"<img src='" + imgSrc + "' id='machinePic" + count + "' class='machineIn' draggable='true' style='width:160px;height:120px;margin: 0px;' ondblclick='headerClick()'>" +
				"</div>"
			);
			// $("#header").click();
			$(machine).resizable({
				alsoResize: pic,
				stop: storeStatus,
			});
			count++;

			// @
			$(".machineClass").css("position", "absolute");
			$(".machineClass").on('click', function (ev) {

			})
			controlDiv();

			imgSrc = "";

		}
	}

	//draggable + resizable by jQuery UI
	function controlDiv() {
		$('.machineClass').draggable({
			// handle: '.handler',
			cursor: 'move',
			revert: 'invalid',
			snap: true,
			snapMode: 'outer',
			snapTolerance: 5,
			containment: "#layout",
			scroll: false,
			grid: [10, 10],
			stop: storeStatus,
		});
		// $('.machineClass').css('position', 'absolute');
		$('handler').css('overflow', 'hidden');
		// $('.machineClass').css('overflow', 'auto');

		$('#layout').droppable();
	}

	function headerClick() { //叫出選單的function
		$("#header").click();
	}

	function asideSection() { //左側打勾控制開始 , 暫無功能
		function onChecked(num) {
			var target = ".choose" + num;

			if ($(target).css("opacity") == 1) {
				$(target).fadeTo(300, 0);
			} else {
				$(target).fadeTo(300, 1);
			}
		}

		function mosIn(num) {
			var target = ".checkFont" + num;
			$(target).css("font-weight", 900);
			$(target).css("color", "#FF0000");
		}

		function mosOut(num) {
			var target = ".checkFont" + num;
			$(target).css("font-weight", 500);
			$(target).css("color", "#000000");
		}
	}

	function storeStatus(ev, obj) { // Execute when stop dragging
		// Store DIOObject property
		var o; // DIO物件
		var p; // 廠房物件
		var oo; // 物件 + sessionStorage('layout')組成之字串
		var h, w; // DIO物件長寬
		var ph, pw; // 廠房物件長寬


		if (ev.target.classList.contains('ui-draggable')) { // 事件由DIO物件trigger
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
		sessionStorage.setItem('layoutStatus', JSON.stringify(p));
	}