
export class FlashcardStatistics {
  constructor() {
    this.reset();
  }

  reset() {
    this.total = 0;
    this.correct = 0;
    this.streak = 0;
  }

  recordAnswer(isCorrect) {
    this.total++;

    if (isCorrect) {
      this.correct++;
      this.streak++;
    } else {
      this.streak = 0;
    }
  }

  getStats() {
    return {
      total: this.total,
      correct: this.correct,
      streak: this.streak
    };
  }
}
