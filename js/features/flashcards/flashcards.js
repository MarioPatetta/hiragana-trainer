
import { getCharacters } from "../../data/kana.js";

export function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export class FlashcardDeck {
  constructor() {
    this.deck = [];
    this.previous = null;
  }

  next(group) {
    if (this.deck.length === 0) {
      this.deck = shuffle(getCharacters(group));

      if (
        this.deck.length > 1 &&
        this.deck[this.deck.length - 1] === this.previous
      ) {
        [this.deck[0], this.deck[this.deck.length - 1]] =
          [this.deck[this.deck.length - 1], this.deck[0]];
      }
    }

    const character = this.deck.pop();
    this.previous = character;

    return character;
  }

  reset() {
    this.deck = [];
    this.previous = null;
  }
}
