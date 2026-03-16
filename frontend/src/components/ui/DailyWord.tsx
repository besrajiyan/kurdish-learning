'use client';

import { useTTS } from '@/hooks/useTTS';
import type { Lang } from '@/types';

const DAILY_WORDS = [
  { kmr: 'av', pron: 'av', de: 'Wasser', en: 'water', emoji: '💧', tip_de: 'Kurmanci hat kein grammatisches Geschlecht — kein der/die/das!', tip_en: 'Kurmanji has no grammatical gender like German!' },
  { kmr: 'nan', pron: 'nan', de: 'Brot', en: 'bread', emoji: '🍞', tip_de: '"Nan" ist eines der altesten Worter der kurdischen Sprache.', tip_en: '"Nan" is one of the oldest words in the Kurdish language.' },
  { kmr: 'roj', pron: 'rozh', de: 'Tag / Sonne', en: 'day / sun', emoji: '☀️', tip_de: '"Roj" bedeutet sowohl "Tag" als auch "Sonne".', tip_en: '"Roj" means both "day" and "sun".' },
  { kmr: 'şev', pron: 'shev', de: 'Nacht', en: 'night', emoji: '🌙', tip_de: '"Sev bas" = Gute Nacht!', tip_en: '"Sev bas" = Good night!' },
  { kmr: 'dil', pron: 'dil', de: 'Herz', en: 'heart', emoji: '❤️', tip_de: '"Dile min" = mein Herz — oft als Kosewort benutzt.', tip_en: '"Dile min" = my heart — often used as a term of endearment.' },
  { kmr: 'stêr', pron: 'ster', de: 'Stern', en: 'star', emoji: '⭐', tip_de: '"Stêrk" ist die Verkleinerungsform — kleiner Stern.', tip_en: '"Sterk" is the diminutive — little star.' },
  { kmr: 'gul', pron: 'gul', de: 'Blume / Rose', en: 'flower / rose', emoji: '🌹', tip_de: '"Gul" ist auch ein beliebter kurdischer Vorname.', tip_en: '"Gul" is also a popular Kurdish first name.' },
  { kmr: 'baran', pron: 'ba-ran', de: 'Regen', en: 'rain', emoji: '🌧️', tip_de: '"Baran" ist auch ein kurdischer Vorname, der Kraft symbolisiert.', tip_en: '"Baran" is also a Kurdish name symbolizing strength.' },
  { kmr: 'çiya', pron: 'chi-ya', de: 'Berg', en: 'mountain', emoji: '🏔️', tip_de: 'Kurden sagen: "Çiya tenê hevalê kurdan e" — Berge sind der einzige Freund der Kurden.', tip_en: 'Kurds say: "Mountains are the only friends of the Kurds."' },
  { kmr: 'heval', pron: 'he-val', de: 'Freund', en: 'friend', emoji: '🤝', tip_de: '"Heval" ist ein sehr wichtiges Wort in der kurdischen Kultur.', tip_en: '"Heval" is a very important word in Kurdish culture.' },
  { kmr: 'erd', pron: 'erd', de: 'Erde', en: 'earth', emoji: '🌍', tip_de: '"Erd" kann auch "Boden" oder "Land" bedeuten.', tip_en: '"Erd" can also mean "ground" or "land".' },
  { kmr: 'agir', pron: 'a-gir', de: 'Feuer', en: 'fire', emoji: '🔥', tip_de: 'Newroz, das kurdische Neujahrsfest, feiert man mit Feuer!', tip_en: 'Newroz, the Kurdish New Year, is celebrated with fire!' },
  { kmr: 'ba', pron: 'ba', de: 'Wind', en: 'wind', emoji: '💨', tip_de: '"Ba" ist auch Teil von "baran" (Regen) — ba + ran.', tip_en: '"Ba" is also part of "baran" (rain) — ba + ran.' },
  { kmr: 'dar', pron: 'dar', de: 'Baum', en: 'tree', emoji: '🌳', tip_de: '"Daristan" bedeutet Wald — dar (Baum) + istan (Ort).', tip_en: '"Daristan" means forest — dar (tree) + istan (place).' },
];

function getDailyWord() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_WORDS[dayOfYear % DAILY_WORDS.length];
}

const UI = {
  de: { title: 'Wort des Tages', tip: 'Wusstest du?', listen: 'Anhoren' },
  en: { title: 'Word of the Day', tip: 'Did you know?', listen: 'Listen' },
};

export default function DailyWord({ lang }: { lang: Lang }) {
  const word = getDailyWord();
  const ui = UI[lang];
  const { speak, speakingId } = useTTS();
  const isPlaying = speakingId === 'daily';

  return (
    <section className="card bg-gradient-to-br from-primary-50 to-magic-50 border-2 border-primary-100 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-primary-800 font-display">{ui.title}</h2>
        <span className="text-3xl">{word.emoji}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => speak(word.kmr, 'kmr', 'daily')}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-all ${
            isPlaying ? 'bg-primary text-white animate-pulse' : 'bg-primary-100 hover:bg-primary-200'
          }`}
        >
          🔊
        </button>
        <div>
          <p className="text-2xl font-extrabold text-primary">{word.kmr}</p>
          <p className="text-xs text-ink-tertiary">[{word.pron}]</p>
          <p className="text-ink-secondary text-sm">{lang === 'de' ? word.de : word.en}</p>
        </div>
      </div>
      <div className="bg-surface-elevated rounded-xl p-3">
        <p className="text-xs text-magic font-bold">{ui.tip}</p>
        <p className="text-sm text-ink-secondary">{lang === 'de' ? word.tip_de : word.tip_en}</p>
      </div>
    </section>
  );
}
