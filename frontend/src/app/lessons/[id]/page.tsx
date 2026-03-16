'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLesson } from '@/lib/api';
import { useLang } from '@/hooks/useLang';
import { useTTS } from '@/hooks/useTTS';
import { useRecorder } from '@/hooks/useRecorder';
import LevelBadge from '@/components/ui/LevelBadge';
import Mascot from '@/components/ui/Mascot';
import type { LessonDetail } from '@/types';

const UI = {
  de: {
    back: '← Zurück',
    startEx: 'Jetzt spielen',
    words: 'Wörter zum Lernen',
    noDesc: 'Los geht\'s! Viel Spaß! 🎉',
    notFound: 'Ups! Nicht gefunden 😕',
    listenTip: '🔊 Hören  •  🎙️ Nachsprechen  •  🔁 Vergleichen',
    listening: 'Hör gut zu! 👂',
    recording: 'Sprich jetzt! 🎙️',
    playMine: 'Meine Stimme 🔁',
  },
  en: {
    back: '← Back',
    startEx: 'Play now',
    words: 'Words to learn',
    noDesc: 'Let\'s go! Have fun! 🎉',
    notFound: 'Oops! Not found 😕',
    listenTip: '🔊 Listen  •  🎙️ Say it  •  🔁 Compare',
    listening: 'Listen carefully! 👂',
    recording: 'Speak now! 🎙️',
    playMine: 'My voice 🔁',
  },
};

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLang();
  const ui = UI[lang];
  const { speak, stop, speakingId } = useTTS();
  const { recording, audioUrl, recordingId, startRecording, stopRecording, playRecording, clear } = useRecorder();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLesson(Number(id)).then(setLesson).finally(() => setLoading(false));
    return () => stop();
  }, [id, stop]);

  function handleListen(word: { kmr: string; id: number; audio_kmr: string | null }) {
    clear();
    speak(word.kmr, 'kmr', String(word.id), word.audio_kmr || undefined);
  }

  function handleRecord(wordId: number) {
    stop();
    if (recording) {
      stopRecording();
    } else {
      startRecording(String(wordId));
    }
  }

  function handlePlayMine() {
    stop();
    playRecording();
  }

  if (loading) return (
    <div className="flex flex-col items-center gap-4 py-20">
      <Mascot mood="thinking" size="lg" />
    </div>
  );

  if (!lesson) return (
    <div className="text-center py-20 space-y-4">
      <Mascot mood="sad" size="lg" />
      <p className="text-ink-secondary">{ui.notFound}</p>
    </div>
  );

  const description = t({ de: lesson.description_de, en: lesson.description_en, kmr: lesson.description_kmr });

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <Link href="/lessons" className="text-primary text-sm hover:underline">{ui.back}</Link>
        <div className="mt-3 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-800 font-display">
              {t({ de: lesson.title_de, en: lesson.title_en })}
            </h1>
            <p className="text-primary font-semibold mt-1">{lesson.title_kmr}</p>
          </div>
          <LevelBadge level={lesson.level} lang={lang} />
        </div>
        {description && <p className="text-ink-secondary mt-3">{description}</p>}
        {!description && <p className="text-ink-tertiary mt-3 italic">{ui.noDesc}</p>}
      </div>

      {/* Words */}
      {lesson.words.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-ink-primary font-display">{ui.words} ({lesson.words.length})</h2>
          <p className="text-sm text-ink-tertiary">{ui.listenTip}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lesson.words.map((word) => {
              const isPlaying = speakingId === String(word.id);
              const isRecording = recording && recordingId === String(word.id);
              const hasRecording = audioUrl && recordingId === String(word.id);

              return (
                <div
                  key={word.id}
                  className={`card space-y-3 transition-all duration-300 ${
                    isPlaying ? 'border-2 border-primary bg-primary-50 scale-[1.02] shadow-lg'
                    : isRecording ? 'border-2 border-danger bg-danger-50 scale-[1.02] shadow-lg'
                    : 'border-2 border-transparent'
                  }`}
                >
                  {/* Word info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-all ${
                      isPlaying ? 'bg-primary-100 animate-pulse'
                      : isRecording ? 'bg-danger-100 animate-pulse'
                      : 'bg-surface-secondary'
                    }`}>
                      {word.emoji || '🔊'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-lg font-extrabold text-primary-600 ${isPlaying || isRecording ? 'animate-pulse' : ''}`}>
                        {word.kmr}
                      </p>
                      {word.pronunciation && (
                        <p className="text-xs text-ink-tertiary italic">[{word.pronunciation}]</p>
                      )}
                      <p className="text-ink-secondary text-sm">
                        {lang === 'de' ? word.de : word.en}
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {/* Listen button */}
                    <button
                      onClick={() => isPlaying ? stop() : handleListen(word)}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all min-h-[44px] ${
                        isPlaying
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                      }`}
                    >
                      {isPlaying ? '⏹️' : '🔊'} {isPlaying ? ui.listening : (lang === 'de' ? 'Hören' : 'Listen')}
                    </button>

                    {/* Record button */}
                    <button
                      onClick={() => handleRecord(word.id)}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all min-h-[44px] ${
                        isRecording
                          ? 'bg-danger text-white animate-pulse'
                          : 'bg-danger-50 text-danger-600 hover:bg-danger-100'
                      }`}
                    >
                      {isRecording ? '⏹️ ' + ui.recording : '🎙️ ' + (lang === 'de' ? 'Sprechen' : 'Speak')}
                    </button>

                    {/* Play my recording */}
                    {hasRecording && (
                      <button
                        onClick={handlePlayMine}
                        className="py-2.5 px-3 rounded-xl font-bold text-sm bg-accent-50 text-accent-600 hover:bg-accent-100 transition-all min-h-[44px]"
                        title={ui.playMine}
                      >
                        🔁
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Start exercises */}
      <div className="text-center pt-4">
        <Link href={`/exercises/${lesson.id}`} className="btn-primary inline-block text-lg px-8 py-3">
          {ui.startEx} 🎮
        </Link>
      </div>
    </div>
  );
}
