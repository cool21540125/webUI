// Left Side button onchange=改變範例圖片
function changeImgReview() {
    document.getElementById("machinePrototype").src = "img/" + document.getElementById("selectedMachine").value;
}


function addMachine() {
    var size = 50;
    var factoryArea = document.getElementById('factoryArea'); // 廠區 Canvas
    var machineImage = document.getElementById('machinePrototype'); // 機器型錄樣本
    var newArea; // 新的設備空間
    var areaID; // 設備空間編號
    var newMachine; // 設備圖樣
    var machineID; // 新設備編號



    function assignFactoryArea2MachineArea() { // A1. 設備空間劃分
        function newMachineAreaProperty(h, w) { // B1. 設備空間屬性設定
            newArea = document.createElement('canvas');
            newArea.className = 'machineArea';
            newArea.id = getAreaID(newArea.className);
            newArea.height = h;
            newArea.width = w;
            areaID = newArea.id;

            function getAreaID(areaClassName) { // 取得最新的設備空間id
                var allMachineAreas = document.getElementsByClassName(areaClassName);
                return (areaClassName + allMachineAreas.length);
            }
        }

        function assignNewMachineArea() { // B2. 配置設備空間到廠區
            factoryArea.appendChild(newArea);
            var newMachineArea = document.getElementById(newArea.id);
        }

        function machineAreaDraggable() {
            console.log(areaID);
            var iid = '#' + areaID;
            $(iid).draggable();

            $(iid).draggable({
                containment: "parent"
            });
        }

        newMachineAreaProperty(size, size); // b1. 設備空間屬性設定
        assignNewMachineArea(); // b2. 配置設備空間到廠區
        machineAreaDraggable(); //b3. 設備空間可以移動

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
var c0 = document.getElementById('factoryArea');
c0.addEventListener('click', addMachine, false);