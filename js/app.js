
import { FlashcardDeck } from "./flashcards.js";
import { Dictation } from "./dictation.js";

const $ = id => document.getElementById(id);

const deck = new FlashcardDeck();

let current = null;
let answered = false;

let stats = {
  total: 0,
  correct: 0,
  streak: 0
};

let showCharacter = false;

function nextCharacter() {
  current = deck.next($("group").value);
  answered = false;

  $("kana").textContent = current[0];
  $("answer").textContent = "?";
  $("reveal").disabled = false;
  $("rating").classList.add("hidden");
}

function revealAnswer() {
  if (answered || !current) return;

  $("answer").textContent = current[1];
  $("rating").classList.remove("hidden");
  $("reveal").disabled = true;
}

function rateAnswer(isCorrect) {
  if (answered) return;

  answered = true;
  stats.total++;

  if (isCorrect) {
    stats.correct++;
    stats.streak++;
  } else {
    stats.streak = 0;
  }

  updateStats();
  nextCharacter();
}

function updateStats() {
  $("total").textContent = stats.total;
  $("correct").textContent = stats.correct;
  $("streak").textContent = stats.streak;

  const percentage = stats.total
    ? stats.correct / stats.total * 100
    : 0;

  $("progressBar").style.width = percentage + "%";
}

// DICTATION

const dictation = new Dictation({
  getCharacter: () => current,
  getInterval: () => Number($("interval").value),

  onStatus: status => {
    $("dictationStatus").textContent = status;
  },

  onNext: () => {
    nextCharacter();

    $("dictationAnswer").textContent =
      showCharacter ? current[0] : "";
  },
});

// MODE SWITCHING

function setMode(mode) {
  const isDictation = mode === "dictation";

  dictation.stop();

  $("flashPanel").classList.toggle("hidden", isDictation);
  $("dictationPanel").classList.toggle("hidden", !isDictation);

  $("flashMode").className =
    isDictation ? "secondary" : "primary";

  $("dictationMode").className =
    isDictation ? "primary" : "secondary";

  if (isDictation) {
    $("dictationStatus").textContent = "Ready to listen";
    $("dictationAnswer").textContent = showCharacter && isDictation && current ? current[0] : "";
  }
}

// EVENT LISTENERS

$("reveal").addEventListener("click", revealAnswer);

$("next").addEventListener("click", nextCharacter);

$("correctBtn").addEventListener("click", () => {
  rateAnswer(true);
});

$("wrongBtn").addEventListener("click", () => {
  rateAnswer(false);
});

$("group").addEventListener("change", () => {
  deck.reset();
  nextCharacter();
  $("dictationAnswer").textContent = "";
});

$("flashMode").addEventListener("click", () => {
  setMode("flash");
});

$("dictationMode").addEventListener("click", () => {
  setMode("dictation");
});

$("startDictation").addEventListener("click", () => {
  dictation.start();
});

$("pauseDictation").addEventListener("click", () => {
  dictation.pause();
});

$("repeatDictation").addEventListener("click", () => {
  dictation.repeat();
});

$("showDictation").addEventListener("click", () => {
  showCharacter = !showCharacter;

  $("dictationAnswer").textContent =
    showCharacter && current ? current[0] : "";

  $("showDictation").textContent =
    showCharacter ? "Hide character" : "Show character";

  $("showDictation").classList.toggle("primary", showCharacter);
  $("showDictation").classList.toggle("secondary", !showCharacter);
});

// INITIALISE

nextCharacter();
