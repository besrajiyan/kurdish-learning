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
    chooseSub: 'Kurmanci lernen — fur jedes Alter',
    childTitle: 'Fur Kinder',
    childDesc: 'Spielerisch lernen mit bunten Bildern, Quizzen & Sternen',
    childAge: '4-12 Jahre',
    childCta: 'Kinderwelt entdecken',
    adultTitle: 'Fur Erwachsene',
    adultDesc: 'Strukturiert lernen mit Grammatik, Kultur & Konversation',
    adultAge: 'Ab 13 Jahren',
    adultCta: 'Jetzt starten',
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
      { icon: '📖', title: 'Lektionen', desc: 'Systematischer Wortschatz A1-C2', color: 'from-primary to-primary-600' },
      { icon: '✍️', title: 'Grammatik', desc: 'Kurmanci-Satzstruktur verstehen', color: 'from-magic to-magic-600' },
      { icon: '🗣️', title: 'Aussprache', desc: 'Muttersprachliche Audio & Aufnahme', color: 'from-success to-success-600' },
      { icon: '🌍', title: 'Kultur', desc: 'Kurdische Kultur & Geschichte', color: 'from-accent to-accent-600' },
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
    // Landing stats
    statUsers: 'Lernende',
    statLessons: 'Lektionen',
    statLangs: 'Sprachen',
  },
  en: {
    chooseTitle: 'Welcome to kurdi.ch!',
    chooseSub: 'Learn Kurmanji — for every age',
    childTitle: 'For Kids',
    childDesc: 'Learn through play with colorful images, quizzes & stars',
    childAge: 'Ages 4-12',
    childCta: 'Explore Kids World',
    adultTitle: 'For Adults',
    adultDesc: 'Structured learning with grammar, culture & conversation',
    adultAge: 'Ages 13+',
    adultCta: 'Get Started',
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
      { icon: '📖', title: 'Lessons', desc: 'Systematic vocabulary A1-C2', color: 'from-primary to-primary-600' },
      { icon: '✍️', title: 'Grammar', desc: 'Understand Kurmanji sentence structure', color: 'from-magic to-magic-600' },
      { icon: '🗣️', title: 'Pronunciation', desc: 'Native audio & recording', color: 'from-success to-success-600' },
      { icon: '🌍', title: 'Culture', desc: 'Kurdish culture & history', color: 'from-accent to-accent-600' },
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
    statUsers: 'Learners',
    statLessons: 'Lessons',
    statLangs: 'Languages',
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
      <div className="space-y-0 -mx-4 -mt-8">
        {/* Hero header */}
        <div className="text-center py-12 px-4 bg-gradient-to-b from-primary-50 to-surface-primary">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-primary font-display mb-3">
            {ui.chooseTitle}
          </h1>
          <p className="text-ink-secondary text-lg max-w-md mx-auto">{ui.chooseSub}</p>
        </div>

        {/* Split audience selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
          {/* ─── KIDS SIDE ─── */}
          <button
            onClick={() => setAudience('child')}
            className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-accent-50 via-danger-50 to-magic-50 p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-b md:border-b-0 md:border-r border-surface-tertiary"
          >
            {/* Floating decorations */}
            <div className="absolute top-6 left-6 text-4xl float opacity-60">🌈</div>
            <div className="absolute top-10 right-8 text-3xl float opacity-60" style={{ animationDelay: '1s' }}>🦋</div>
            <div className="absolute bottom-8 left-10 text-3xl float opacity-60" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute bottom-12 right-6 text-4xl float opacity-60" style={{ animationDelay: '1.5s' }}>🎮</div>

            <div className="relative z-10 space-y-6">
              <div className="text-8xl mb-2">🧒</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-800 font-display">
                {ui.childTitle}
              </h2>
              <p className="text-ink-secondary text-base max-w-xs mx-auto">{ui.childDesc}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="text-sm bg-accent text-white px-4 py-1.5 rounded-full font-bold shadow-sm">
                  {ui.childAge}
                </span>
              </div>
              <div className="text-4xl space-x-2">🎨 📚 🏆</div>
              <div className="mt-4 bg-accent text-white font-bold px-8 py-3 rounded-full shadow-lg group-hover:shadow-glow-accent transition-all inline-block text-lg">
                {ui.childCta}
              </div>
            </div>
          </button>

          {/* ─── ADULTS SIDE ─── */}
          <button
            onClick={() => setAudience('adult')}
            className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-magic-800 p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
          >
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-magic/30 blur-3xl"></div>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="text-8xl mb-2">🎓</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {ui.adultTitle}
              </h2>
              <p className="text-white/70 text-base max-w-xs mx-auto">{ui.adultDesc}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="text-sm bg-white/20 text-white px-4 py-1.5 rounded-full font-bold backdrop-blur-sm">
                  {ui.adultAge}
                </span>
                <span className="text-sm bg-magic/30 text-white px-4 py-1.5 rounded-full font-bold backdrop-blur-sm">
                  A1 → C2
                </span>
              </div>
              {/* CEFR level preview */}
              <div className="flex justify-center gap-1.5 mt-2">
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl, i) => (
                  <span key={lvl} className={`text-xs font-bold px-2 py-1 rounded ${LEVEL_COLORS[i]} text-white`}>
                    {lvl}
                  </span>
                ))}
              </div>
              <div className="mt-4 bg-white text-primary-800 font-bold px-8 py-3 rounded-full shadow-lg group-hover:shadow-glow-magic transition-all inline-block text-lg">
                {ui.adultCta}
              </div>
            </div>
          </button>
        </div>

        {/* About section */}
        <section className="bg-surface-secondary px-4 py-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-extrabold text-ink-primary font-display">{ui.aboutTitle}</h2>
            <p className="text-ink-secondary max-w-xl mx-auto leading-relaxed">{ui.aboutText}</p>
          </div>
        </section>
      </div>
    );
  }

  /* ─── Main Home (audience selected) ─── */
  const features = isChild ? ui.featuresChild : ui.featuresAdult;
  const phrases = isChild ? ui.phrasesChild : ui.phrasesAdult;
  const hero = isChild ? ui.heroChild : ui.heroAdult;
  const sub = isChild ? ui.subChild : ui.subAdult;

  /* ═══ CHILD HOME ═══ */
  if (isChild) {
    return (
      <div className="space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6 py-8">
          <HeroIllustration />
          <Mascot mood={user ? 'excited' : 'happy'} size="lg" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-800 font-display leading-tight">
            {hero}
          </h1>
          <p className="text-ink-secondary text-lg max-w-md mx-auto">{sub}</p>

          {user ? (
            <div className="space-y-3">
              <p className="font-bold text-xl text-primary-600">
                {ui.welcome}, {user.username}!&nbsp;
                <StarBadge count={user.total_stars} size="lg" />
              </p>
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

          <button
            onClick={() => setAudience('adult')}
            className="text-xs text-ink-tertiary hover:text-primary transition-colors"
          >
            🎓 {ui.switchMode}
          </button>
        </section>

        {/* Feature cards */}
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className={`rounded-3xl p-6 text-white text-center space-y-2 ${f.color} shadow-lg`}>
              <div className="text-5xl">{f.icon}</div>
              <h3 className="text-xl font-extrabold font-display">{f.title}</h3>
              <p className="text-white/80 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Phrases with TTS */}
        <section className="card bg-surface-secondary space-y-4 text-center">
          <h2 className="text-2xl font-extrabold text-primary-800 font-display">
            Kurdi Fer Bibe 🦋
          </h2>
          <p className="text-sm text-ink-tertiary">{ui.tapToHear}</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
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
                  <p className={`font-extrabold text-primary text-2xl ${isPlaying ? 'animate-pulse' : ''}`}>
                    {isPlaying ? '🔊 ' : ''}{p.kmr}
                  </p>
                  <p className="text-sm text-ink-secondary mt-1">{p.tr}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* About */}
        <section className="rounded-3xl bg-primary text-white p-8 text-center space-y-3">
          <p className="text-4xl">🌍</p>
          <h2 className="text-2xl font-extrabold font-display">{ui.aboutTitle}</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">{ui.aboutText}</p>
        </section>
      </div>
    );
  }

  /* ═══ ADULT HOME ═══ */
  return (
    <div className="space-y-12">
      {/* Hero - sleek, professional */}
      <section className="-mx-4 -mt-8 px-6 py-16 bg-gradient-to-br from-primary-800 via-primary-900 to-magic-800 text-white text-center relative overflow-hidden">
        {/* Subtle background decor */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-magic/30 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight font-display">
            {hero}
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">{sub}</p>

          {user ? (
            <div className="space-y-4">
              <p className="font-semibold text-lg text-white/90">
                {ui.welcome}, {user.username}
              </p>
              <StreakBadge lang={lang} />
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/lessons" className="bg-white text-primary-800 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all min-h-[44px] inline-flex items-center">
                  {ui.continue}
                </Link>
                {user.role === 'parent' && (
                  <Link href="/parent" className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all min-h-[44px] inline-flex items-center">
                    {lang === 'de' ? 'Eltern-Dashboard' : 'Parent Dashboard'}
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/auth/register" className="bg-white text-primary-800 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all min-h-[44px] inline-flex items-center">
                {ui.register}
              </Link>
              <Link href="/lessons" className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all min-h-[44px] inline-flex items-center">
                {ui.start}
              </Link>
            </div>
          )}

          <button
            onClick={() => setAudience('child')}
            className="text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            🧒 {ui.switchMode}
          </button>
        </div>
      </section>

      {/* Daily word */}
      <DailyWord lang={lang} />

      {/* Feature cards - gradient style for adults */}
      <section className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className={`rounded-2xl p-5 text-white text-center space-y-2 bg-gradient-to-br ${f.color} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
          >
            <div className="text-3xl">{f.icon}</div>
            <h3 className="text-base font-extrabold font-display">{f.title}</h3>
            <p className="text-white/80 text-xs">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Phrases with TTS - clean adult style */}
      <section className="rounded-2xl bg-white border border-surface-tertiary p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-ink-primary font-display">
            {lang === 'de' ? 'Kurmanci — Erste Satze' : 'Kurmanji — First Phrases'}
          </h2>
          <p className="text-sm text-ink-tertiary mt-1">{ui.tapToHear}</p>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {phrases.map((p) => {
            const isPlaying = speakingId === p.kmr;
            return (
              <button
                key={p.kmr}
                onClick={() => speak(p.kmr, 'kmr', p.kmr)}
                className={`rounded-xl p-4 text-left min-h-[44px] border transition-all ${
                  isPlaying
                    ? 'border-primary bg-primary-50 shadow-md'
                    : 'border-surface-tertiary bg-surface-primary hover:border-primary-200 hover:bg-primary-50/50'
                }`}
              >
                <p className={`font-bold text-primary text-lg ${isPlaying ? 'animate-pulse' : ''}`}>
                  {isPlaying ? '🔊 ' : ''}{p.kmr}
                </p>
                <p className="text-sm text-ink-secondary mt-1">{p.tr}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Level guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-ink-primary font-display">{ui.levelGuide}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ui.levels.map((lvl, i) => (
            <div key={lvl.level} className="rounded-2xl bg-white border border-surface-tertiary p-4 space-y-1 hover:shadow-md transition-all">
              <div className="flex items-center gap-2">
                <span className={`${LEVEL_COLORS[i]} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}>
                  {lvl.level}
                </span>
                <span className="font-bold text-ink-primary text-sm">{lvl.name}</span>
              </div>
              <p className="text-xs text-ink-secondary">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="rounded-2xl bg-gradient-to-br from-primary-800 to-magic-800 text-white p-8 text-center space-y-3">
        <h2 className="text-2xl font-extrabold font-display">{ui.aboutTitle}</h2>
        <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed">{ui.aboutText}</p>
      </section>
    </div>
  );
}
