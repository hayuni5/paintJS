const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
// HTMLCollection으로 뜸!! -< array로 바꿔벌이자
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2C2C2C";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 300, 300);

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    //console.log(event);
    /* 해당 이벤트 객체의 속성 중... 우리가 만질 부분에 연관된 속성은 offset속성이당
    우리가 짜놓은 캔버스에 한한 마우스의 좌표값을 나타냄
    clientX, Y는 윈도우 전체의 범위 내 마우스 위치값을 나타냄
     */
    const x = event.offsetX;
    const y = event.offsetY;
    //마우스가 캔버스 안에 들어갔을 때, 캔버스를 클릭하는 순간을 인지하게 하고 싶고,
    //캔버스를 클릭했을 때 painting을 시작해야 함
    //캔버스를 떼기 전까지 painting하고, 캔버스에서 마우스 클릭 상태를 해제하면 painting 그만하기.
    //캔버스를 벗어나면 그 때에도 painting을 그만해야함
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){    //모든 움직임을 감지하고 선을 그림. 선은? context요소의 path메소드로!!
    //console.log(event);
    painting = true;
}

function handleColorClick(event){ //-> context의 color을 변경하기!
    // console.log(event.target.style); //이벤트가 발생한 목표객체의 css style 확인가능
    const color = event.target.style.backgroundColor;
    // console.log(color); 확인용도
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    // console.log(event);
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {    //클릭시 모드 전환~
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCntextMenu(event) {
    // console.log(event);
    event.preventDefault();
}

function handleSaveClick() {
    
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCntextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
// 앗! 화살표함수다!
// 무명함수를 생성하는 방법임.
/* 
화살표함수와 일반함수표현식 비교 예제
1. 일반함수표현식
    filteredArray = myArray.filter(function(element) {
        return element>2;
    });

2. 화살표함수
    filteredArray = myArray.filter(element => element > 2);

코드가 깔끔해졌쥬?
this가 바인딩하지 않는다는 기능상 차이도 있음

예제2)
    var myObj = {
        text: "hi!",
        func: function() {
            setTimeout(function(){
                console.log(this.text);
            }, 1000)
        },
        func2: function(){
            setTimeout(()=>console.log(this.text), 1000);
        }
    };

    myObj.func();       //undefined
    myObj.func2();      //"hi!"

    func의 경우, setTimeout의 콜백으로 fucntion으로 생성된 무명함수가 들어감.
    이 경우, this는 생성된 무명함수가 되어 this.text == undefined가 됨

    func2처럼 화살표함수를 사용하면, this는 myObj로 그대로 남게 되어 this.text는
    "hi!"가 됨
*/

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}