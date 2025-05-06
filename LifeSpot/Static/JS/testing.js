// Создаем объект Map
let myMap = new Map();
myMap.set("Германия", "Берлин")
myMap.set("Швеция", "Стокгольм")
myMap.set(1, "Москва")

let newArray = [];
// Перебор Map в цикле for
for (let result of myMap){
    newArray.push(result);
}
console.log(newArray);

let newArrayOfStrings = [];
// Перебор Map с помощью Array.from
// Позволяет на лету выполнять операции с парой ключ-значение
Array.from(myMap, ([key,value]) => newArrayOfStrings.push(`${key} - ${value}`) );
console.log(newArrayOfStrings);


/*
* Обработчик клика
*
* */
const saveInput = function () {
    // Вытащим значение текстового поля (как у нас уже делается при фильтрации)
    let currentInput = document.getElementsByTagName('input')[0].value.toLowerCase();

    // Покажем окно с прошлым и новым значением
    alert('Последний ввод: ' + this.lastInput /* равноценно window.lastInput, так как мы работаем в контексте браузера */
        + '\n' + 'Текущий ввод: ' + currentInput);

    // Сохраним новое значение в контекст
    this.lastInput = currentInput;
}