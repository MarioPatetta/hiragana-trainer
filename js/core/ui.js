
const $ = id => document.getElementById(id);

export function renderFlashcard(character, answer = "?") {
  $("kana").textContent = character;
  $("answer").textContent = answer;
}

export function resetFlashcard() {
  $("answer").textContent = "?";
  $("reveal").disabled = false;
  $("rating").classList.add("hidden");
}

export function revealFlashcard(answer) {
  $("answer").textContent = answer;
  $("rating").classList.remove("hidden");
  $("reveal").disabled = true;
}

export function renderStats(stats) {
  $("total").textContent = stats.total;
  $("correct").textContent = stats.correct;
  $("streak").textContent = stats.streak;

  const percentage = stats.total
    ? stats.correct / stats.total * 100
    : 0;

  $("progressBar").style.width = percentage + "%";
}

export function setMode(mode) {
  const isDictation = mode === "dictation";

  $("flashPanel").classList.toggle("hidden", isDictation);
  $("dictationPanel").classList.toggle("hidden", !isDictation);

  $("flashMode").className =
    isDictation ? "secondary" : "primary";

  $("dictationMode").className =
    isDictation ? "primary" : "secondary";
}

export function renderDictationAnswer(character) {
  $("dictationAnswer").textContent = character || "";
}

export function renderDictationStatus(status) {
  $("dictationStatus").textContent = status;
}

export function setShowCharacterButton(visible) {
  $("showDictation").textContent =
    visible ? "Hide character" : "Show character";

  $("showDictation").classList.toggle("primary", visible);
  $("showDictation").classList.toggle("secondary", !visible);
}

export function setDictationPlaybackButton(isPlaying) {
  const button = $("toggleDictation");

  button.textContent = isPlaying
    ? "Ⅱ Pause"
    : "▶ Play";
}