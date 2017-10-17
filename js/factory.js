	var imgSrc = "";
	var count = 0;
	$(function () {

		function restoreSessionStorage() { // Restore property when load
			try {
				var qq = $('#layout > .machineClass');
				var ss;
				for (var i = 0; i < qq.length; i++) { // Restore property one by one
					ss = sessionStorage.getItem(qq[i].id);

					qq[i].style.top = ss.top;
					qq[i].style.left = ss.left;
					qq[i].offsetWidth = ss.width;
					qq[i].offsetHeight = ss.height;
					// qq[i].style.zIndex = ss.zIndex;

				}

			} catch (err) {
				console.log('Error happened when restore sessionStorage');
			}
		}

		document.getElementById("clickimg").addEventListener('change', updateHandler, false);
		$('nav#menu').mmenu(); //左方選單
		$(".mm-title").html("機台設定"); //設定title
		$(".hrefList").click( //超連結失效
			function (e) {
				e.preventDefault();
				e.stopPropagation();
			}
		);

		$(".factoryArea").resizable({
			stop: handleResizeStop,
		});

		restoreSessionStorage(); // 重新載入上次storage

	});

	function handleResizeStop(ev, obj) {
		storeStatus(ev, obj);
	}

	function updateFile() {
		$("#clickimg").click();
	}

	function dropHandler(evt) { //evt 為 DragEvent 物件
		evt.preventDefault();
		$("#machine").css("background-color", "white");
		var files = evt.dataTransfer.files; //由DataTransfer物件的files屬性取得檔案物件

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

	function dragStart(evt) {
		// console.log('start drag DIO trigger ondragend="addMachine()" on imgDIV');
		imgSrc = evt.target.src;
		
	}

	function openfile(evt) {
		if ($("#imgDIV > img").size() == 5) {
			alert("最多只能新增五張圖片");
			return;
		}
		var img = evt.target.result;
		$('#imgDIV').append(
			"<img src='" + img + "' class='machine' draggable='true' ondragstart='dragStart(event)' ondragend='addMachine()'>"
		);
	}

	function AllowDrop(event) {
		event.preventDefault();
	}

	//圖片src放入layout
	function addMachine(evt) {
		if (evt != null && imgSrc != "") {
			var machine = "#machine" + count;
			var pic = "#machinePic" + count;
			$('#layout').append(
				"<div class='machineClass row-sm-1' id='machine" + count + "' style='padding:0px; z-index:0'>" +
				"<div class='handler'>Container1</div>" +
				"<img src='" + imgSrc + "' id='machinePic" + count + "' class='machineIn' draggable='true' style='width:160px;height:120px;margin: 0px;' ondblclick='headerClick()'>" +
				"</div>"
			);
			// $("#header").click();
			$(machine).resizable({
				alsoResize: pic,
				stop: handleResizeStop,
			});
			count++;

			// @
			$(".machineClass").css("position", "absolute");
			controlDiv();
			imgSrc = "";
			// storeStatus(evt, evt.target);
		}
	}

	//叫出選單的function
	function headerClick() {
		$("#header").click();
	}

	//左側打勾控制開始
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
	//左側打勾控制結束

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
			grid: [20, 20],
			stop: storeStatus,
		});
		// $('.machineClass').css('position', 'absolute');
		$('handler').css('overflow', 'hidden');
		// $('.machineClass').css('overflow', 'auto');

		$('.factoryArea').droppable();
	}


	function handleDragStop(ev, obj) { 
		storeStatus(ev, obj);
	}

	function storeStatus(ev, obj) { // Execute when stop dragging
	// Store DIOObject property
		var o; // DIO物件
		var p; // 廠房物件
		var oo; // 物件 + sessionStorage('layout')組成之字串
		var h, w;	// DIO物件長寬
		var ph, pw;	// 廠房物件長寬


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
			}
			
		} else {	// 事件由廠區物件trigger
			pw = ev.target.offsetWidth;
			ph = ev.target.offsetHeight;
			o = "";
		}


		p = {
			"id": "plantLayout",
			"width": pw,
			"height": ph,
			"objects": function(ev, o) {
				var s = JSON.parse(sessionStorage.getItem('layoutStatus'));
				var newDIOStatus = {};
				
				if (s === null || s.objects === undefined) {	// 首次執行時, 無session
					return [o];

				} else {
					var mm = s.objects;
					if (mm.length === 1 && mm[0] === "") {
						return [o];	// 第一個objects
					} else {
						for (var i = 0; i < mm.length; i++) { // 尋找同id的objects
							if (o.id === s.objects[i].id) {
								s.objects[i]['id'] = o.id;
								s.objects[i]['top'] = o.top;
								s.objects[i]['left'] = o.left;
								s.objects[i]['width'] = o.width;
								s.objects[i]['height'] = o.height;
								return s.objects;
							}
						}

						// 新增一筆
						s.objects.push(o);
						return s.objects;
					}
				}
			}(ev, o)
		};

		console.log(p.objects);
		sessionStorage.setItem('layoutStatus', JSON.stringify(p));
	}

/*

var pw = '400px';
var ph = '400px';
p = {
	"id": "plantLayout",
	"width": pw,
	"height": ph,
	"objects": oo,
};

JSON.parse(sessionStorage.getItem("layoutStatus"))


*/