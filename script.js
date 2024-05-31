var
    canv = document.getElementById('canvas'),
    ctx = canv.getContext('2d'),
    isMouseDown = false,
    touchStart = null;
const canvas = document.querySelector('.ctx')
//
canv.setAttribute('width', canvas.clientWidth+'px');
canv.setAttribute('height', canvas.clientHeight+'px')

// знчения кисти по умолчанию
ctx.strokeStyle = "pink";
ctx.fillStyle = "pink";

ctx.lineWidth = 15*2;
let size = 15;

// читаем кнопки палитры и ластик
const colorRed = document.querySelector('.colorRed');
const colorBlue = document.querySelector('.colorBlue');
const colorGreen = document.querySelector('.colorGreen');
const colorYellow = document.querySelector('.colorYellow');
const color = document.querySelector('.color');
const eraser = document.querySelector('.eraser');

// смена цвета кисти
colorRed.addEventListener('click', function(){
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
})
colorBlue.addEventListener('click', function(){
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
})
colorGreen.addEventListener('click', function(){
    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
})
colorYellow.addEventListener('click', function(){
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
})
color.oninput = function(){
    ctx.strokeStyle = this.value;
    ctx.fillStyle = this.value;
}
eraser.addEventListener('click', function(){
    ctx.strokeStyle = '#dddde2';
    ctx.fillStyle = '#dddde2';
})

// изменение размера кисти
const sizeSmall = document.querySelector('.sizeSmall');
const sizeMedium = document.querySelector('.sizeMedium');
const sizeBig = document.querySelector('.sizeBig');
const sizeRange = document.querySelector('.nav');
const brushScale = document.querySelector('.brushScale');

sizeSmall.addEventListener('click', function(){
    ctx.lineWidth = 15*2;
    size = 15;
})
sizeMedium.addEventListener('click', function(){
    ctx.lineWidth = 25*2;
    size = 25;
})
sizeBig.addEventListener('click', function(){
    ctx.lineWidth = 35*2;
    size = 35;
})
//изменение размера по шкале
sizeRange.oninput = function(){
    ctx.lineWidth = this.value*2;
    size = this.value;
    brushScale.style.display = 'block';
    brushScale.style.width = this.value + 'px';
    brushScale.style.height = this.value + 'px';
    brushScale.style.borderRadius = this.value + 'px';
    brushScale.style.backgroundColor = ctx.fillStyle;

}
sizeRange.addEventListener('mouseleave', function(){
    setTimeout(function(){
        brushScale.style.display = 'none';
    },300)
 
})


// очистить все поле
const btn2 = document.querySelector('.btn2');
btn2.addEventListener('click', function(){
    let saveColor = ctx.fillStyle;
    ctx.fillStyle = '#dddde2';
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = saveColor;
})

// получить новое слово
const btn1 = document.querySelector('.btn1');
const tgBotToken = "6911582749:AAF3yK76iQaPCLw_xaDBCxoaqAkIGyQzSMg";
const tgChatID = "@N_o_tification_Bot";
const api = `https://api.telegram.org/bot${tgBotToken}/sendMessage`;
btn1.addEventListener("click", async function(){

    let words = ['Будильник','Зарядка','Акварель','Травма','Оригами','Пульс','Спорт'];
    min = 0;
    max = 7;
    getWord = Math.floor(Math.random() * max);
    const text = `Ваше новое слово:  ${words[getWord]}`;
    try{
        const response = await fetch(api,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: tgChatID,
                text,
            })
        });
        // if(response.ok){

        // }
    }
    catch(error){

    }
})



canv.addEventListener("mousedown", function(e){
    isMouseDown = true;
});

canv.addEventListener("mouseup", function(e){
    isMouseDown = false;
    ctx.beginPath();//сбрасываем путь чтобы линия была с открывом
});

canv.addEventListener("mousemove", function(e){
    if (isMouseDown){
        //дорисовать линию к текущей позиции от последней
        
        let rect = canv.getBoundingClientRect();
        let mouseY = e.clientY-rect.top;
        ctx.lineTo(e.clientX, mouseY);
        ctx.stroke();

        //нарисовать круг
        ctx.beginPath();
        ctx.arc(e.clientX, mouseY, size, 0, Math.PI*2);
        
        ctx.fill();

        //начать новый путь, смена позиции
        ctx.beginPath();
        ctx.moveTo(e.clientX, mouseY);
    }
    
});

// для тачскрина

canv.addEventListener("touchstart", function(e){
    touchStart = 1;
});

canv.addEventListener("touchend", function(e){
    //Очищаем позиции
    touchStart = null;
    ctx.beginPath();//сбрасываем путь чтобы линия была с открывом
});

canv.addEventListener("touchmove", function(e){
    
    if (touchStart != null){
         //дорисовать линию к текущей позиции от последней
        //  ctx.strokeStyle = "rgb(72, 77, 227)";
        //  ctx.lineWidth = 15*2;
        let rect = canv.getBoundingClientRect();
        let mouseY = e.changedTouches[0].clientY-rect.top;
         ctx.lineTo(e.changedTouches[0].clientX, mouseY);
         ctx.stroke();

         //нарисовать круг
         ctx.beginPath();
         ctx.arc(e.changedTouches[0].clientX, mouseY, size, 0, Math.PI*2);
        //  ctx.fillStyle = "rgb(72, 77, 227)";
         ctx.fill();

         //начать новый путь, смена позиции
         ctx.beginPath();
         ctx.moveTo(e.changedTouches[0].clientX, mouseY);
    }
    
});



