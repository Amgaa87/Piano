import { keys } from "./keys.js";
const allKeys = [];
const audioMap = {};

document.addEventListener("DOMContentLoaded", () => {
    const pianoContainer = document.querySelector(".piano-keys");
    createPianoKeys(pianoContainer);
    preloadAudio();
    document.addEventListener("keydown", pressedKey);
    pianoKeysContainer.querySelectorAll(".key").for((key) => {
        key.addEventListener("click", () => playTune(key.dataset.key));
    });
});

const createPianoKeys = (container) => {
    keys.forEach(({ note, key, isBlack, mappedKey }) => {
        const li = document.createElement("li");
        li.className = `key ${isBlack ? "black" : "white"}`;
        const displayKey = mappedKey || key;
        li.dataset.key = displayKey;
        li.innerHTML = `<div>${note}</div>
                        <span>${key.toUpperCase()}</span>`;
        container.appendChild(li);
        allKeys.push(displayKey);
    });
};

const preloadAudio = () => {
    allKeys.forEach((keyName) => {
        audioMap[keyName] = new Audio(`./pianoKeys/${keyName}.mp3`);
    });
};
const pressedKey = (e) => {
    const { mappedKey } = keys.find(({ key }) => key === e.key);
    const key = mappedKey || e.key;
    if (allKeys.includes(key)) {
        playTune(key);
    }
};
const playTune = (key) => {
    const audio = audioMap[key];
    if (!audio) return;
    audio.currentTime = 0;

    const volumeInput = document.querySelector(".volume-slider input");
    audio.volume = volumeInput.value;
    audio.play();

    const clickedKey = document.querySelector(`[data-key = "${key}"]`);
    clickedKey.classList.add("active");

    setTimeout(() => clickedKey.classList.remove(active), 150);
};
