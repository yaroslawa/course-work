// кнопка на QR на странице index
const botBtn = document.querySelector('.botBtn');
const form = document.querySelector('.form');
botBtn.addEventListener('click', function(){
    // alert('В данный момент телеграм-бот находится на стадии разработки.');
    window.open('https://t.me/N_otification_Bot', '_blank');
    
    const inputText = document.createElement('div');
    inputText.className ='inputText';
    form.appendChild(inputText);
    
    const inp = document.createElement("input");
    inp.type = "text";
    inp.placeholder = "Введите ссылку на группу";
    inputText.appendChild(inp);

    const btnDone = document.createElement('div');
    btnDone.className ='btnDone';
    form.appendChild(btnDone);

    const textP = document.createElement("p");
    textP.innerHTML = "Готово";
    btnDone.appendChild(textP);

    btnDone.addEventListener("click", function(){
        let str = inp.value;
        if(str.length < 13){
            alert("Возможно, введена не полная ссылка на группу.");
            inp.value = "";
        }
        else{
            let searchId = str.slice(13);
            searchId = "@"+searchId;
            console.log(searchId);
            if (sessionStorage.getItem("key") == searchId){
                alert("Перезапустите браузер, чтобы добавить новую ссылку.");
            }
            else{
                sessionStorage.setItem("key", searchId);
                alert("Ссылка сохранена успешно");
            }
        }
        
    })
    

    

})

