# 1.需求說明

## a. 前端
1. 模擬廠房平面圖, 上頭可以新增、拖拉、刪除機器設備的圖片
2. 可以將目前的擺設狀態儲存下來, 將來可再開啟

## b. 後端
1. 每個機器設備的圖片點選後, 可以看到機器設備基本的狀態(與後端連結),ex: 設備id, 運轉燈號(紅黃綠), 連結網址(連到設備的完整資訊頁面), or 與Power BI串接

## c. 未確定該放前端還後端
1. 機器設備圖片的新增
    - 直接寫死在html? <font color="lightgreen">不太可能這樣做</font>
    - 圖片來自資料庫? <font color="lightgreen">後端</font>
    - 讓使用者可以自行由前端上傳, 之後再新增? <font color="lightgreen">前端</font>  
        - [點我看範例](http://knuckles.disp.cc/github/imgUpload/imgUpload.html)
    - 讀取本地某資料夾底下的所有圖片, html內的下拉式選單可以動態新增 <font color="lightgreen">前端</font>




# 2.基本定義
[概念圖示](./problem1.jpg)

<font color="yellow">廠區(div)</font>, 裏頭會有許多的<font color="yellow">設備空間(canvas)</font>, 設備空間再畫上<font color="yellow">設備圖片(image)</font> <br />
canvas本身是一個看不到的畫布, 使用canvas.getContext('2d')可以取得<font color="yellow">畫筆ctx</font>, 再使用ctx.drawImage(), 來將圖片畫到畫布上面

# 3.進度
[目前進度範例](./demo1/index.html)

## 應克服的問題
- 設備拖拉不應能重疊 <font color="red"> 目前會重疊 </font>
- 新增設備應以下列其中一種方式來新增 <font color="red"> 目前的新增方式不怎麼合理 </font>
    - 點選新增鈕後, 於廠區外新增設備, 再以拖拉的方式拖拉進廠區
    - 直接在場區double Click, 再點選的地方直接新增機器


## 將來可能產生的需求
- 可以批量新增設備(目前只能一台一台新增)
- 設備拖拉時, 顯示對齊線 [對齊線範例(但有瑕疵)](http://runjs.cn/code/7woaho1m)

--- 
2017/09/18, Tony