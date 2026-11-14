
const audioMap = {
  // BASIC HIRAGANA
  "あ": "seion/a.mp3",
  "い": "seion/i.mp3",
  "う": "seion/u.mp3",
  "え": "seion/e.mp3",
  "お": "seion/o.mp3",

  "か": "seion/ka.mp3",
  "き": "seion/ki.mp3",
  "く": "seion/ku.mp3",
  "け": "seion/ke.mp3",
  "こ": "seion/ko.mp3",

  "さ": "seion/sa.mp3",
  "し": "seion/shi.mp3",
  "す": "seion/su.mp3",
  "せ": "seion/se.mp3",
  "そ": "seion/so.mp3",

  "た": "seion/ta.mp3",
  "ち": "seion/chi.mp3",
  "つ": "seion/tsu.mp3",
  "て": "seion/te.mp3",
  "と": "seion/to.mp3",

  "な": "seion/na.mp3",
  "に": "seion/ni.mp3",
  "ぬ": "seion/nu.mp3",
  "ね": "seion/ne.mp3",
  "の": "seion/no.mp3",

  "は": "seion/ha.mp3",
  "ひ": "seion/hi.mp3",
  "ふ": "seion/fu.mp3",
  "へ": "seion/he.mp3",
  "ほ": "seion/ho.mp3",

  "ま": "seion/ma.mp3",
  "み": "seion/mi.mp3",
  "む": "seion/mu.mp3",
  "め": "seion/me.mp3",
  "も": "seion/mo.mp3",

  "や": "seion/ya.mp3",
  "ゆ": "seion/yu.mp3",
  "よ": "seion/yo.mp3",

  "ら": "seion/ra.mp3",
  "り": "seion/ri.mp3",
  "る": "seion/ru.mp3",
  "れ": "seion/re.mp3",
  "ろ": "seion/ro.mp3",

  "わ": "seion/wa.mp3",
  "を": "seion/wo.mp3",
  "ん": "seion/n.mp3",

  // DAKUTEN
  "が": "dakuon/ga.mp3",
  "ぎ": "dakuon/gi.mp3",
  "ぐ": "dakuon/gu.mp3",
  "げ": "dakuon/ge.mp3",
  "ご": "dakuon/go.mp3",

  "ざ": "dakuon/za.mp3",
  "じ": "dakuon/ji.mp3",
  "ず": "dakuon/zu.mp3",
  "ぜ": "dakuon/ze.mp3",
  "ぞ": "dakuon/zo.mp3",

  "だ": "dakuon/da.mp3",
  "ぢ": "dakuon/di.mp3",
  "づ": "dakuon/du.mp3",
  "で": "dakuon/de.mp3",
  "ど": "dakuon/do.mp3",

  "ば": "dakuon/ba.mp3",
  "び": "dakuon/bi.mp3",
  "ぶ": "dakuon/bu.mp3",
  "べ": "dakuon/be.mp3",
  "ぼ": "dakuon/bo.mp3",

  // HANDAKUTEN
  "ぱ": "handakuon/pa.mp3",
  "ぴ": "handakuon/pi.mp3",
  "ぷ": "handakuon/pu.mp3",
  "ぺ": "handakuon/pe.mp3",
  "ぽ": "handakuon/po.mp3",

  // COMBINATIONS
  "きゃ": "yoon/kya.mp3",
  "きゅ": "yoon/kyu.mp3",
  "きょ": "yoon/kyo.mp3",

  "しゃ": "yoon/sya.mp3",
  "しゅ": "yoon/syu.mp3",
  "しょ": "yoon/syo.mp3",

  "ちゃ": "yoon/cya.mp3",
  "ちゅ": "yoon/cyu.mp3",
  "ちょ": "yoon/cyo.mp3",

  "にゃ": "yoon/nya.mp3",
  "にゅ": "yoon/nyu.mp3",
  "にょ": "yoon/nyo.mp3",

  "ひゃ": "yoon/hya.mp3",
  "ひゅ": "yoon/hyu.mp3",
  "ひょ": "yoon/hyo.mp3",

  "みゃ": "yoon/mya.mp3",
  "みゅ": "yoon/myu.mp3",
  "みょ": "yoon/myo.mp3",

  "りゃ": "yoon/rya.mp3",
  "りゅ": "yoon/ryu.mp3",
  "りょ": "yoon/ryo.mp3",

  "ぎゃ": "yoon/gya.mp3",
  "ぎゅ": "yoon/gyu.mp3",
  "ぎょ": "yoon/gyo.mp3",

  "じゃ": "yoon/zya.mp3",
  "じゅ": "yoon/zyu.mp3",
  "じょ": "yoon/zyo.mp3",

  "びゃ": "yoon/bya.mp3",
  "びゅ": "yoon/byu.mp3",
  "びょ": "yoon/byo.mp3",

  "ぴゃ": "yoon/pya.mp3",
  "ぴゅ": "yoon/pyu.mp3",
  "ぴょ": "yoon/pyo.mp3"
};

export function getAudioPath(character) {
  const filename = audioMap[character];

  if (!filename) {
    throw new Error(
      `No audio recording found for: ${character}`
    );
  }

  return `assets/audio/hiragana/${filename}`;
}
