
import { FlashcardsController } from "../features/flashcards/controller.js";
import { DictationController } from "../features/dictation/controller.js";
import { categoryGroups } from "../data/kana.js";
import * as ui from "./ui.js";

const $ = id => document.getElementById(id);

// Shared selection state
const selectedGroups = new Set(
  categoryGroups.flatMap(category =>
    category.groups.map(group => group.id)
  )
);

const flashcards = new FlashcardsController(ui);

const dictation = new DictationController(
  ui,
  () => {
    const sliderValue = Number($("interval").value);
    return 5.5 - sliderValue;
  }
);

// CATEGORY SELECTOR

function renderCategories() {
  const container = $("learningCategories");
  container.innerHTML = "";

  categoryGroups.forEach(category => {
    const selectedCount = category.groups.filter(
      group => selectedGroups.has(group.id)
    ).length;

    const allSelected = selectedCount === category.groups.length;
    const partiallySelected = selectedCount > 0 && !allSelected;

    const section = document.createElement("section");
    section.className = "category-section";

    const macroButton = document.createElement("button");
    macroButton.type = "button";
    macroButton.className = "macro-toggle";
    macroButton.setAttribute("aria-pressed", String(allSelected));
    macroButton.dataset.state = allSelected
      ? "selected"
      : partiallySelected
        ? "partial"
        : "unselected";

    macroButton.innerHTML = `
      <span class="macro-symbol">${category.symbol}</span>
      <span class="macro-label">${category.label}</span>
      <span class="macro-status">
        ${selectedCount}/${category.groups.length}
      </span>
    `;

    macroButton.addEventListener("click", () => {
      const shouldSelect = !allSelected;

      category.groups.forEach(group => {
        if (shouldSelect) {
          selectedGroups.add(group.id);
        } else {
          selectedGroups.delete(group.id);
        }
      });

      updateSelection();
    });

    const microContainer = document.createElement("div");
    microContainer.className = "micro-groups";

    category.groups.forEach(group => {
      const isSelected = selectedGroups.has(group.id);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "micro-toggle";
      button.setAttribute("aria-pressed", String(isSelected));

      if (isSelected) {
        button.classList.add("selected");
      }

      button.textContent = group.label;

      button.addEventListener("click", () => {
        if (selectedGroups.has(group.id)) {
          selectedGroups.delete(group.id);
        } else {
          selectedGroups.add(group.id);
        }

        updateSelection();
      });

      microContainer.appendChild(button);
    });

    section.appendChild(macroButton);
    section.appendChild(microContainer);
    container.appendChild(section);
  });
}

function updateSelection() {
  renderCategories();

  const selection = [...selectedGroups];
  const summary = $("selectionSummary");

  if (selection.length === 0) {
    summary.textContent = "Select at least one learning group.";
    return;
  }

  summary.textContent =
    `${selection.length} learning group(s) selected`;

  flashcards.reset(selection);
  dictation.reset(selection);
}

$("selectAllGroups").addEventListener("click", () => {
  const allGroups = categoryGroups.flatMap(
    category => category.groups.map(group => group.id)
  );

  const everythingSelected = allGroups.every(
    group => selectedGroups.has(group)
  );

  if (everythingSelected) {
    selectedGroups.clear();
  } else {
    allGroups.forEach(group => selectedGroups.add(group));
  }

  updateSelection();
});

// MODE SWITCHING

function switchMode(mode) {
  dictation.stop();
  ui.setMode(mode);

  if (mode === "dictation") {
    ui.renderDictationStatus("Ready to listen");
  }
}

// FLASHCARDS

$("reveal").addEventListener("click", () => {
  flashcards.reveal();
});

$("next").addEventListener("click", () => {
  if (selectedGroups.size) {
    flashcards.next([...selectedGroups]);
  }
});

$("correctBtn").addEventListener("click", () => {
  if (selectedGroups.size) {
    flashcards.rate(true, [...selectedGroups]);
  }
});

$("wrongBtn").addEventListener("click", () => {
  if (selectedGroups.size) {
    flashcards.rate(false, [...selectedGroups]);
  }
});

// MODES

$("flashMode").addEventListener("click", () => {
  switchMode("flash");
});

$("dictationMode").addEventListener("click", () => {
  switchMode("dictation");
});

// DICTATION

$("toggleDictation").addEventListener("click", () => {
  if (selectedGroups.size) {
    dictation.togglePlayback();
  }
});

$("repeatDictation").addEventListener("click", () => {
  dictation.repeat();
});

$("showDictation").addEventListener("click", () => {
  dictation.toggleCharacter();
});

// SPEED

$("interval").addEventListener("input", () => {
  const sliderValue = Number($("interval").value);
  const interval = 5.5 - sliderValue;

  $("intervalValue").textContent =
    `${interval.toFixed(1)} seconds between characters`;
});

// INITIALIZATION

renderCategories();

const initialSelection = [...selectedGroups];

$("selectionSummary").textContent =
  `${initialSelection.length} learning group(s) selected`;

flashcards.initialize(initialSelection);
dictation.initialize(initialSelection);