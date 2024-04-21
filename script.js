var
    canv = document.getElementById('canvas'),
    ctx = canv.getContext('2d'),
    isMouseDown = false,
    touchStart = null;
canv.width = window.innerWidth;
canv.height = window.innerHeight;

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
        ctx.strokeStyle = "pink";
        ctx.lineWidth = 20*2;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        //нарисовать круг
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 20, 0, Math.PI*2);
        ctx.fillStyle = "pink";
        ctx.fill();

        //начать новый путь, смена позиции
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
    
});


var touchPosition = null;

canv.addEventListener("touchstart", function(e){
    touchStart = 1;
});

canv.addEventListener("touchend", function(e){
    //Очищаем позиции
    touchStart = null;
    //touchPosition = null;
    ctx.beginPath();//сбрасываем путь чтобы линия была с открывом
});

canv.addEventListener("touchmove", function(e){
    
    if (touchStart != null){
         //дорисовать линию к текущей позиции от последней
         ctx.strokeStyle = "rgb(72, 77, 227)";
         ctx.lineWidth = 20*2;
         ctx.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
         ctx.stroke();

         //нарисовать круг
         ctx.beginPath();
         ctx.arc(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 20, 0, Math.PI*2);
         ctx.fillStyle = "rgb(72, 77, 227)";
         ctx.fill();

         //начать новый путь, смена позиции
         ctx.beginPath();
         ctx.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    
});
