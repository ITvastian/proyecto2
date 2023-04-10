const buttons = document.querySelectorAll(".button");
const text = document.getElementById(".text");
const remove = document.getElementById(".remove");
const clear = document.getElementById(".clear");
const result = document.getElementById(".result");


buttons.forEach(button => {
    console.log(button);
    button.addEventListener("click", _=>{
        text.value += button.value
    })
})