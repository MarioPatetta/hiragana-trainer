
import { FlashcardsController } from "../features/flashcards/controller.js";
import { DictationController } from "../features/dictation/controller.js";

import * as ui from "./ui.js";

const $ = id => document.getElementById(id);

// INITIALIZE FEATURES

const flashcards = new FlashcardsController(ui);

const dictation = new DictationController(
  ui,
  () => {
    const sliderValue = Number($("interval").value);
    return 5.5 - sliderValue;
  }
);

// MODE SWITCHING

function switchMode(mode) {
  dictation.stop();

  ui.setMode(mode);

  if (mode === "dictation") {
    ui.renderDictationStatus("Ready to listen");
  }
}

// EVENT LISTENERS

$("reveal").addEventListener("click", () => {
  flashcards.reveal();
});

$("next").addEventListener("click", () => {
  flashcards.next($("group").value);
});

$("correctBtn").addEventListener("click", () => {
  flashcards.rate(true, $("group").value);
});

$("wrongBtn").addEventListener("click", () => {
  flashcards.rate(false, $("group").value);
});

$("group").addEventListener("change", () => {
  flashcards.reset($("group").value);
  dictation.reset($("group").value);
});

$("flashMode").addEventListener("click", () => {
  switchMode("flash");
});

$("dictationMode").addEventListener("click", () => {
  switchMode("dictation");
});

$("toggleDictation").addEventListener("click", () => {
  dictation.togglePlayback();
});

$("repeatDictation").addEventListener("click", () => {
  dictation.repeat();
});

$("showDictation").addEventListener("click", () => {
  dictation.toggleCharacter();
});


$("interval").addEventListener("input", () => {
  const sliderValue = Number($("interval").value);
  const interval = 5.5 - sliderValue;

  $("intervalValue").textContent =
    `${interval.toFixed(1)} seconds between characters`;
});

// INITIALIZATION

flashcards.initialize($("group").value);
dictation.initialize($("group").value);
