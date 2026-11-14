
import { Dictation } from "./dictation.js";
import { DictationSession } from "./session.js";

export class DictationController {
  constructor(ui, getInterval) {
    this.ui = ui;
    this.session = new DictationSession();

    this.dictation = new Dictation({
      getCharacter: () => this.session.getCharacter(),

      getInterval,

      onStatus: status => {
        this.ui.renderDictationStatus(status);

        const isPlaying = [
            "Listening...",
            "Next character coming...",
            "Replaying..."
        ].includes(status);

        this.ui.setDictationPlaybackButton(isPlaying);
      },

      onNext: () => {
        this.next();
      }
    });
  }

  next(group) {
    const character = this.session.next(group);

    this.ui.renderDictationAnswer(
      this.session.showCharacter ? character[0] : ""
    );
  }

  start() {
    this.dictation.start();
  }

  pause() {
    this.dictation.pause();
  }

  repeat() {
    this.dictation.repeat();
  }

  stop() {
    this.dictation.stop();
  }

  toggleCharacter() {
    const visible = this.session.toggleCharacterVisibility();
    const character = this.session.getCharacter();

    this.ui.renderDictationAnswer(
      visible && character ? character[0] : ""
    );

    this.ui.setShowCharacterButton(visible);
  }

  togglePlayback() {
    if (this.dictation.running) {
        this.pause();
    } else {
        this.start();
    }
}

  reset(group) {
    this.stop();
    this.session.reset();
    this.next(group);
  }

  initialize(group) {
    this.next(group);
  }
}
