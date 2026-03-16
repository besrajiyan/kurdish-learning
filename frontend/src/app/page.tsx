'use client';

import Link from 'next/link';
import { useAuth } from '@/store/auth';
import { useAudience } from '@/store/audience';
import { useLang } from '@/hooks/useLang';
import { useTTS } from '@/hooks/useTTS';
import StarBadge from '@/components/ui/StarBadge';
import Mascot from '@/components/ui/Mascot';
import HeroIllustration from '@/components/ui/HeroIllustration';
import DailyWord from '@/components/ui/DailyWord';
import StreakBadge from '@/components/ui/StreakBadge';

/* ────── i18n ────── */
const UI = {
  de: {
    // Audience selector
    chooseTitle: 'Willkommen bei kurdi.ch!',
    chooseSub: 'Wahle deinen Bereich:',
    childTitle: 'Fur Kinder',
    childDesc: 'Spielerisch lernen mit bunten Bildern, Quizzen & Sternen',
    childAge: '4-12 Jahre',
    adultTitle: 'Fur Erwachsene',
    adultDesc: 'Strukturiert lernen mit Grammatik, Kultur & Konversation',
    adultAge: 'Ab 13 Jahren',
    // Child home
    heroChild: 'Lerne Kurmanci mit Spass!',
    subChild: 'Hor dir Worter an, spiel Quizze und sammle Sterne',
    // Adult home
    heroAdult: 'Kurmanci lernen — Schritt fur Schritt',
    subAdult: 'Von A1 bis C2: Wortschatz, Grammatik, Konversation & Kultur',
    // Shared
    start: 'Los geht\'s!',
    register: 'Kostenlos starten',
    welcome: 'Hallo',
    continue: 'Weiterlernen',
    switchMode: 'Bereich wechseln',
    // Features - child
    featuresChild: [
      { icon: '📚', title: 'Lektionen', desc: 'Neue Worter horen & lernen', color: 'bg-primary' },
      { icon: '🎮', title: 'Ubungen', desc: 'Lustige Quizze spielen', color: 'bg-magic' },
      { icon: '⭐', title: 'Sterne', desc: 'Punkte sammeln & aufsteigen', color: 'bg-accent' },
    ],
    // Features - adult
    featuresAdult: [
      { icon: '📖', title: 'Lektionen', desc: 'Systematischer Wortschatz A1-C2', color: 'bg-primary' },
      { icon: '✍️', title: 'Grammatik', desc: 'Kurmanci-Satzstruktur verstehen', color: 'bg-magic' },
      { icon: '🗣️', title: 'Aussprache', desc: 'Muttersprachliche Audio & Aufnahme', color: 'bg-success' },
      { icon: '🌍', title: 'Kultur', desc: 'Kurdische Kultur & Geschichte', color: 'bg-accent' },
    ],
    // Phrases
    phrasesChild: [
      { kmr: 'Silav!', tr: 'Hallo!' },
      { kmr: 'Spas!', tr: 'Danke!' },
      { kmr: 'Bas e!', tr: 'Gut!' },
      { kmr: 'Nave min...', tr: 'Mein Name ist...' },
    ],
    phrasesAdult: [
      { kmr: 'Silav, tu cawa yi?', tr: 'Hallo, wie geht es dir?' },
      { kmr: 'Ez baş im, spas.', tr: 'Mir geht es gut, danke.' },
      { kmr: 'Tu ji ku dere yi?', tr: 'Woher kommst du?' },
      { kmr: 'Ez ji Almanyaye me.', tr: 'Ich komme aus Deutschland.' },
      { kmr: 'Kurmanci hın dibe xweş e!', tr: 'Kurmanci lernen macht Spass!' },
    ],
    tapToHear: 'Tippe zum Anhoren',
    aboutTitle: 'Was ist Kurmanci?',
    aboutText: 'Kurmanci ist die meistgesprochene kurdische Sprache. Uber 20 Millionen Menschen sprechen sie — in der Turkei, Syrien, im Irak und Iran. Hier lernst du sie — egal ob Kind oder Erwachsener!',
    statsTitle: 'Dein Fortschritt',
    levelGuide: 'Stufenplan',
    levels: [
      { level: 'A1', name: 'Anfanger', desc: 'Grundlegende Worter & Satze' },
      { level: 'A2', name: 'Grundlagen', desc: 'Alltagssituationen meistern' },
      { level: 'B1', name: 'Mittelstufe', desc: 'Gesprache fuhren konnen' },
      { level: 'B2', name: 'Fortgeschritten', desc: 'Komplexe Themen diskutieren' },
      { level: 'C1', name: 'Fachkompetenz', desc: 'Fliessend & nuanciert sprechen' },
      { level: 'C2', name: 'Meisterschaft', desc: 'Nahezu muttersprachlich' },
    ],
  },
  en: {
    chooseTitle: 'Welcome to kurdi.ch!',
    chooseSub: 'Choose your section:',
    childTitle: 'For Kids',
    childDesc: 'Learn through play with colorful images, quizzes & stars',
    childAge: 'Ages 4-12',
    adultTitle: 'For Adults',
    adultDesc: 'Structured learning with grammar, culture & conversation',
    adultAge: 'Ages 13+',
    heroChild: 'Learn Kurmanji — it\'s fun!',
    subChild: 'Listen to words, play quizzes and collect stars',
    heroAdult: 'Learn Kurmanji — Step by Step',
    subAdult: 'From A1 to C2: Vocabulary, grammar, conversation & culture',
    start: 'Let\'s go!',
    register: 'Start for free',
    welcome: 'Hello',
    continue: 'Keep learning',
    switchMode: 'Switch section',
    featuresChild: [
      { icon: '📚', title: 'Lessons', desc: 'Hear & learn new words', color: 'bg-primary' },
      { icon: '🎮', title: 'Exercises', desc: 'Play fun quizzes', color: 'bg-magic' },
      { icon: '⭐', title: 'Stars', desc: 'Earn points & level up', color: 'bg-accent' },
    ],
    featuresAdult: [
      { icon: '📖', title: 'Lessons', desc: 'Systematic vocabulary A1-C2', color: 'bg-primary' },
      { icon: '✍️', title: 'Grammar', desc: 'Understand Kurmanji sentence structure', color: 'bg-magic' },
      { icon: '🗣️', title: 'Pronunciation', desc: 'Native audio & recording', color: 'bg-success' },
      { icon: '🌍', title: 'Culture', desc: 'Kurdish culture & history', color: 'bg-accent' },
    ],
    phrasesChild: [
      { kmr: 'Silav!', tr: 'Hello!' },
      { kmr: 'Spas!', tr: 'Thank you!' },
      { kmr: 'Bas e!', tr: 'Good!' },
      { kmr: 'Nave min...', tr: 'My name is...' },
    ],
    phrasesAdult: [
      { kmr: 'Silav, tu cawa yi?', tr: 'Hello, how are you?' },
      { kmr: 'Ez bas im, spas.', tr: 'I\'m fine, thank you.' },
      { kmr: 'Tu ji ku dere yi?', tr: 'Where are you from?' },
      { kmr: 'Ez ji Almanyaye me.', tr: 'I\'m from Germany.' },
      { kmr: 'Kurmanci hın dibe xwes e!', tr: 'Learning Kurmanji is fun!' },
    ],
    tapToHear: 'Tap to listen',
    aboutTitle: 'What is Kurmanji?',
    aboutText: 'Kurmanji is the most widely spoken Kurdish language. Over 20 million people speak it — in Turkey, Syria, Iraq and Iran. Learn it here — whether you\'re a child or an adult!',
    statsTitle: 'Your progress',
    levelGuide: 'Level Guide',
    levels: [
      { level: 'A1', name: 'Beginner', desc: 'Basic words & phrases' },
      { level: 'A2', name: 'Elementary', desc: 'Handle everyday situations' },
      { level: 'B1', name: 'Intermediate', desc: 'Hold conversations' },
      { level: 'B2', name: 'Upper-intermediate', desc: 'Discuss complex topics' },
      { level: 'C1', name: 'Advanced', desc: 'Speak fluently & nuanced' },
      { level: 'C2', name: 'Mastery', desc: 'Near-native proficiency' },
    ],
  },
};

const LEVEL_COLORS = ['bg-success', 'bg-primary', 'bg-magic', 'bg-accent', 'bg-danger', 'bg-ink-primary'];

/* ────── Component ────── */
export default function HomePage() {
  const { user, loading } = useAuth();
  const { audience, setAudience, isChild, isAdult } = useAudience();
  const { lang } = useLang();
  const ui = UI[lang];
  const { speak, speakingId } = useTTS();

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Mascot mood="thinking" size="lg" />
    </div>
  );

  /* ─── Audience Selector (first visit) ─── */
  if (!audience) {
    return (
      <div className="space-y-12 py-8">
        <div className="text-center space-y-4">
          <HeroIllustration />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-800 font-display">
            {ui.chooseTitle}
          </h1>
          <p className="text-ink-secondary text-lg">{ui.chooseSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Child card */}
          <button
            onClick={() => setAudience('child')}
            className="card border-4 border-transparent hover:border-accent hover:shadow-glow-accent text-left space-y-4 transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-6xl text-center">🧒</div>
            <h2 className="text-2xl font-extrabold text-primary-800 text-center font-display">
              {ui.childTitle}
            </h2>
            <p className="text-ink-secondary text-center text-sm">{ui.childDesc}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-xs bg-accent-50 text-accent-600 px-3 py-1 rounded-full font-bold">
                {ui.childAge}
              </span>
              <span className="text-xs bg-primary-50 text-primary px-3 py-1 rounded-full font-bold">
                ⭐ {lang === 'de' ? 'Spielerisch' : 'Playful'}
              </span>
            </div>
            <div className="text-center text-3xl">🎮 🎨 🌈</div>
          </button>

          {/* Adult card */}
          <button
            onClick={() => setAudience('adult')}
            className="card border-4 border-transparent hover:border-primary hover:shadow-glow-magic text-left space-y-4 transition-all duration-300 hover:scale-105 group"
          >
            <div className="text-6xl text-center">🎓</div>
            <h2 className="text-2xl font-extrabold text-primary-800 text-center font-display">
              {ui.adultTitle}
            </h2>
            <p className="text-ink-secondary text-center text-sm">{ui.adultDesc}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-xs bg-magic-50 text-magic px-3 py-1 rounded-full font-bold">
                {ui.adultAge}
              </span>
              <span className="text-xs bg-success-50 text-success px-3 py-1 rounded-full font-bold">
                A1 → C2
              </span>
            </div>
            <div className="text-center text-3xl">📖 ✍️ 🗣️</div>
          </button>
        </div>

        {/* About section */}
        <section className="rounded-3xl bg-primary text-white p-8 text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-4xl">🌍</p>
          <h2 className="text-2xl font-extrabold font-display">{ui.aboutTitle}</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">{ui.aboutText}</p>
        </section>
      </div>
    );
  }

  /* ─── Main Home (audience selected) ─── */
  const features = isChild ? ui.featuresChild : ui.featuresAdult;
  const phrases = isChild ? ui.phrasesChild : ui.phrasesAdult;
  const hero = isChild ? ui.heroChild : ui.heroAdult;
  const sub = isChild ? ui.subChild : ui.subAdult;

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 py-8">
        {isChild && <HeroIllustration />}
        {isChild && <Mascot mood={user ? 'excited' : 'happy'} size="lg" />}
        <h1 className={`font-extrabold leading-tight font-display ${
          isChild ? 'text-4xl sm:text-5xl text-primary-800' : 'text-3xl sm:text-4xl text-ink-primary'
        }`}>
          {hero}
        </h1>
        <p className={`max-w-md mx-auto ${isChild ? 'text-ink-secondary text-lg' : 'text-ink-secondary'}`}>
          {sub}
        </p>

        {user ? (
          <div className="space-y-3">
            <p className={`font-bold text-xl ${isChild ? 'text-primary-600' : 'text-ink-primary'}`}>
              {ui.welcome}, {user.username}!
              {isChild && <>&nbsp;<StarBadge count={user.total_stars} size="lg" /></>}
            </p>
            {isAdult && <StreakBadge lang={lang} />}
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/lessons" className="btn-primary">{ui.continue}</Link>
              {user.role === 'parent' && (
                <Link href="/parent" className="btn-secondary">
                  {lang === 'de' ? 'Eltern-Dashboard' : 'Parent Dashboard'}
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/auth/register" className="btn-primary">{ui.register}</Link>
            <Link href="/lessons" className="btn-secondary">{ui.start}</Link>
          </div>
        )}

        {/* Switch mode button */}
        <button
          onClick={() => setAudience(isChild ? 'adult' : 'child')}
          className="text-xs text-ink-tertiary hover:text-primary transition-colors"
        >
          {isChild ? '🎓' : '🧒'} {ui.switchMode}
        </button>
      </section>

      {/* Daily word (adults only) */}
      {isAdult && <DailyWord lang={lang} />}

      {/* Feature cards */}
      <section className={`grid gap-4 ${isChild ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {features.map((f) => (
          <div
            key={f.title}
            className={`rounded-3xl p-6 text-white text-center space-y-2 ${f.color} shadow-lg ${
              isChild ? '' : 'rounded-2xl p-5'
            }`}
          >
            <div className={isChild ? 'text-5xl' : 'text-3xl'}>{f.icon}</div>
            <h3 className={`font-extrabold font-display ${isChild ? 'text-xl' : 'text-base'}`}>{f.title}</h3>
            <p className="text-white/80 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Phrases with TTS */}
      <section className="card bg-surface-secondary space-y-4 text-center">
        <h2 className={`font-extrabold text-primary-800 font-display ${isChild ? 'text-2xl' : 'text-xl'}`}>
          {isChild ? 'Kurdi Fer Bibe 🦋' : 'Kurmanci — Erste Satze'}
        </h2>
        <p className="text-sm text-ink-tertiary">{ui.tapToHear}</p>
        <div className={`grid gap-3 ${isChild ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {phrases.map((p) => {
            const isPlaying = speakingId === p.kmr;
            return (
              <button
                key={p.kmr}
                onClick={() => speak(p.kmr, 'kmr', p.kmr)}
                className={`bg-surface-elevated rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-left min-h-[44px] ${
                  isPlaying ? 'ring-2 ring-primary scale-105 shadow-lg' : 'hover:scale-105'
                }`}
              >
                <p className={`font-extrabold text-primary ${isPlaying ? 'animate-pulse' : ''} ${
                  isChild ? 'text-2xl' : 'text-lg'
                }`}>
                  {isPlaying ? '🔊 ' : ''}{p.kmr}
                </p>
                <p className="text-sm text-ink-secondary mt-1">{p.tr}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Level guide (adults only) */}
      {isAdult && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-ink-primary font-display">{ui.levelGuide}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ui.levels.map((lvl, i) => (
              <div key={lvl.level} className="card p-4 space-y-1 border-l-4 border-primary">
                <div className="flex items-center gap-2">
                  <span className={`${LEVEL_COLORS[i]} text-white text-xs font-bold px-2 py-0.5 rounded`}>
                    {lvl.level}
                  </span>
                  <span className="font-bold text-ink-primary text-sm">{lvl.name}</span>
                </div>
                <p className="text-xs text-ink-secondary">{lvl.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About section */}
      <section className={`text-white p-8 text-center space-y-3 ${
        isChild ? 'rounded-3xl bg-primary' : 'rounded-2xl bg-gradient-to-br from-primary-800 to-magic-800'
      }`}>
        <p className="text-4xl">🌍</p>
        <h2 className="text-2xl font-extrabold font-display">{ui.aboutTitle}</h2>
        <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">{ui.aboutText}</p>
      </section>
    </div>
  );
}
