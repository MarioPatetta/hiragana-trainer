
import { FlashcardDeck } from "../flashcards/flashcards.js";

export class DictationSession {
  constructor() {
    this.deck = new FlashcardDeck();
    this.current = null;
    this.showCharacter = false;
  }

  next(group) {
    this.current = this.deck.next(group);
    return this.current;
  }

  getCharacter() {
    return this.current;
  }

  toggleCharacterVisibility() {
    this.showCharacter = !this.showCharacter;
    return this.showCharacter;
  }

  reset() {
    this.deck.reset();
    this.current = null;
  }
}
