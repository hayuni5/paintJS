const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
    painting = false;
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

}

function onMouseDown(event){
    //console.log(event);
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}