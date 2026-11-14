
import { getAudioPath } from "./audio.js";

export class Dictation {
  constructor({ getCharacter, getInterval, onStatus, onNext }) {
    this.getCharacter = getCharacter;
    this.getInterval = getInterval;
    this.onStatus = onStatus;
    this.onNext = onNext;

    this.running = false;
    this.audio = null;
    this.timer = null;

    this.waiting = false;
    this.remainingDelay = 0;
    this.waitStartedAt = 0;
  }

  speak(restart = false) {
    if (!this.running) return;

    clearTimeout(this.timer);
    this.waiting = false;

    if (restart && this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    const character = this.getCharacter();

    if (!character) return;

    if (!this.audio) {
      let audioPath;

      try {
        audioPath = getAudioPath(character[0]);
      } catch (error) {
        this.running = false;
        this.onStatus(error.message);
        console.error(error);
        return;
      }

      this.audio = new Audio(audioPath);

      const currentAudio = this.audio;

      currentAudio.onended = () => {
        if (!this.running || this.audio !== currentAudio) return;

        this.onStatus("Next character coming...");
        this.scheduleNext();
      };

      currentAudio.onerror = () => {
        if (this.audio !== currentAudio) return;

        this.running = false;
        this.onStatus("Audio playback error");

        console.error("Unable to load:", audioPath);
      };
    }

    this.onStatus("Listening...");

    this.audio.play().catch(error => {
      if (!this.running) return;

      this.running = false;
      this.onStatus("Unable to play audio");

      console.error("Audio playback failed:", error);
    });
  }

  scheduleNext() {
    this.waiting = true;
    this.remainingDelay = this.getInterval() * 1000;
    this.resumeWait();
  }

  resumeWait() {
    if (!this.running || !this.waiting) return;

    this.waitStartedAt = Date.now();

    this.timer = setTimeout(() => {
      if (!this.running) return;

      this.waiting = false;
      this.audio = null;

      this.onNext();
      this.speak();
    }, this.remainingDelay);
  }

  start() {
    if (this.running) return;

    this.running = true;

    if (this.waiting) {
      this.resumeWait();
    } else {
      this.speak();
    }
  }

  pause() {
    this.running = false;

    if (this.waiting) {
      clearTimeout(this.timer);

      this.remainingDelay = Math.max(
        0,
        this.remainingDelay - (Date.now() - this.waitStartedAt)
      );
    }

    if (this.audio) {
      this.audio.pause();
    }

    this.onStatus("Paused");
  }

  repeat() {
    this.running = true;
    this.speak(true);
  }

  stop() {
    this.running = false;

    clearTimeout(this.timer);

    this.waiting = false;
    this.remainingDelay = 0;

    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.audio = null;

    this.onStatus("Stopped");
  }
}
