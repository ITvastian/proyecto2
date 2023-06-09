import languages from "./languages.js";

const selectFirst = document.querySelector(".first");
const selectSecond = document.querySelector(".second");
const translate = document.querySelector(".translate");
const change = document.getElementById("change");
const fromText = document.querySelector(".fromText");
const toText = document.querySelector(".toText");
const reades = document.querySelectorAll(".read");
const listen = document.querySelector(".listen");
const noListen = document.querySelector(".noListen");

const language1 = "en-GB";
const language2 = "es-ES";

for (const i in languages) {
  const key = Object.keys(languages[i]).toString();
  const value = Object.values(languages[i]).toString();
  selectFirst.innerHTML += `<option value=${key}>${value}<option>`;
  selectSecond.innerHTML += `<option value=${key}>${value}<option>`;
}

selectFirst.value = language1;
selectSecond.value = language2;

change.addEventListener("click", _=> {
  const selectFirstValue = selectFirst.value;
  selectFirst.value = selectSecond.value;
  selectSecond.value = selectFirstValue;

  if (!toText.value) return;
  const fromTextValue = fromText.value;
  fromText.value = toText.value;
  toText.value = fromTextValue;
});

translate.addEventListener("click", async _=> {
  if (!fromText.value) return;
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${selectFirst.value}|${selectSecond.value}`
  );
  const data = await res.json();
  toText.value = data.responseData.translatedText;
});

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;

reades.forEach((read, index) => {
  read.addEventListener("click", _=> {
    const textToRead = index == 0 ? fromText.value : toText.value;
    if (!textToRead) return;
    speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead));
  });
});

recognition.onresult = (event) => {
  const results = event.results;
  const frase = results[results.length - 1][0].transcript;
  fromText.value += frase;
};

recognition.onend = (error) => {
  console.log('El microfono dejo de grabar');
}

recognition.onerror = (event) => {
  console.log(event.error);
} 

listen.addEventListener('click', ()=> {
  recognition.start();
});

noListen.addEventListener ('click', () =>{
  recognition.abort();
})