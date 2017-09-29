

function classMachine(x, y, w, h, photo) {   // 機器設備物件模型
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.photo = photo;
    function dragMachine() {
        // 設備可以被移動
    };
}