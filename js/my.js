// Left Side button onchange=改變範例圖片
function changeImgReview() {
    document.getElementById("machinePrototype").src = "img/" + document.getElementById("selectedMachine").value;
}


function init() { // Initialization

    // var factoryArea = document.getElementById('factoryArea');
    var $factoryArea = $('#factoryArea');

    // 增加「購置設備」的事件聆聽 -> buyMachine()
    $('#btnAddNew').click(buyMachine);
    // document.getElementById('btnAddNew').addEventListener('click', buyMachine, false);

    initFactoryArea(120);

    // f
    function initFactoryArea(x) { //a1. 增加div
        var i = 0;
        for (var t = 0; t < x; t++) {
            var newDiv = document.createElement('div');

            newDiv.className = 'machineArea';
            newDiv.id = newDiv.className + i++;
            newDiv.setAttribute('ondrop', "drop(event)");
            newDiv.setAttribute('ondragover', "allowDrop(event)");
            newDiv.style.width = 50;
            newDiv.style.height = 50;
            newDiv.style.border = '1px dotted gray';
            // console.log(newDiv);

            $factoryArea.append(newDiv);

        }
    }
}


function buyMachine() {
    // console.log('hi');

    var size = 50;
    var factoryArea = document.getElementById('newMachineArea'); // 設備暫存區
    var machineImage = document.getElementById('machinePrototype'); // 機器型錄樣本
    var newArea; // 新的設備空間
    var areaID; // 設備空間編號
    var newMachine; // 設備圖樣
    var machineID; // 新設備編號


    function assignFactoryArea2MachineArea() { // A1. 設備空間劃分
        function newMachineAreaProperty(h, w) { // B1. 設備空間屬性設定
            newArea = document.createElement('canvas');
            newArea.className = 'addedMachine';
            newArea.id = getAreaID(newArea.className);
            newArea.height = h;
            newArea.width = w;
            newArea.setAttribute('draggable', 'true');
            newArea.setAttribute('ondragstart', 'drag(event)');
            areaID = newArea.id;

            // console.log(newArea);

            function getAreaID(areaClassName) { // 取得最新的設備空間id
                var allMachineAreas = document.getElementsByClassName(areaClassName);
                return (areaClassName + allMachineAreas.length);
            }
        }

        function assignNewMachineArea() { // B2. 配置設備空間到廠區
            factoryArea.appendChild(newArea);
            var newMachineArea = document.getElementById(newArea.id);
        }

        newMachineAreaProperty(size, size); // b1. 設備空間屬性設定
        assignNewMachineArea(); // b2. 配置設備空間到廠區
    }


    function installMachine() { // A2. 安置機台
        newMachine = document.createElement('img');
        newMachine.src = "img/" + document.getElementById("selectedMachine").value;


        function machinePrototype(h, w) { // B1. 機器屬性設定
            newMachine.className = 'machine';
            newMachine.id = getMachineID(newMachine.className);
            newMachine.height = h;
            newMachine.width = w;
            machineID = newMachine.id;

            function getMachineID(machineClassName) {
                var allMachines = document.getElementsByClassName(machineClassName);
                return (machineClassName + allMachines.length);
            }
        }


        function installMachineToArea() { // B2. 安置機台
            newArea.appendChild(newMachine);

            var newAreaCtx = newArea.getContext('2d');
            newAreaCtx.drawImage(newMachine, 0, 0, size, size);
        }

        machinePrototype(30, 30); // b1. 機器屬性設定
        installMachineToArea() // b2. 把機器放到設備空間
    }

    assignFactoryArea2MachineArea(); // a1. 設備空間劃分
    installMachine() // a2. 安置機台

}



// 就緒後, 啟動
window.addEventListener('load', init, false);