
import { FlashcardDeck } from "./flashcards.js";
import { FlashcardStatistics } from "./statistics.js";

export class FlashcardsController {
  constructor(ui) {
    this.ui = ui;

    this.deck = new FlashcardDeck();
    this.statistics = new FlashcardStatistics();

    this.current = null;
    this.answered = false;
  }

  next(group) {
    this.current = this.deck.next(group);
    this.answered = false;

    this.ui.renderFlashcard(this.current[0]);
    this.ui.resetFlashcard();
  }

  reveal() {
    if (this.answered || !this.current) return;

    this.ui.revealFlashcard(this.current[1]);
  }

  rate(isCorrect, group) {
    if (this.answered) return;

    this.answered = true;

    this.statistics.recordAnswer(isCorrect);

    this.ui.renderStats(this.statistics.getStats());

    this.next(group);
  }

  reset(group) {
    this.deck.reset();
    this.next(group);
  }

  initialize(group) {
    this.ui.renderStats(this.statistics.getStats());
    this.next(group);
  }
}
