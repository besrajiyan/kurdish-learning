'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getExercises, submitAnswer } from '@/lib/api';
import { useAuth } from '@/store/auth';
import { useLang } from '@/hooks/useLang';
import { useTTS } from '@/hooks/useTTS';
import StarBadge from '@/components/ui/StarBadge';
import Mascot from '@/components/ui/Mascot';
import Confetti from '@/components/ui/Confetti';
import { recordStreak } from '@/components/ui/StreakBadge';
import type { Exercise } from '@/types';

const UI = {
  de: {
    back: '← Zurück',
    loginMsg: 'Melde dich an, dann kannst du spielen! 😊',
    loginBtn: 'Anmelden',
    loading: 'Wird geladen…',
    empty: 'Noch keine Übungen hier 🙈',
    correct: 'Toll gemacht! Richtig! 🎉',
    wrong: 'Fast! Versuch es nochmal! 💪',
    next: 'Weiter →',
    finish: 'Geschafft!',
    done: 'Super gemacht! 🏆',
    starsEarned: 'Deine Sterne',
    question: 'Frage',
    of: 'von',
    lessons: 'Lektionen',
    readQuestion: '🔊 Frage vorlesen',
  },
  en: {
    back: '← Back',
    loginMsg: 'Log in to start playing! 😊',
    loginBtn: 'Login',
    loading: 'Loading…',
    empty: 'No exercises here yet 🙈',
    correct: 'Great job! Correct! 🎉',
    wrong: 'Almost! Try again! 💪',
    next: 'Next →',
    finish: 'All done!',
    done: 'Amazing work! 🏆',
    starsEarned: 'Your stars',
    question: 'Question',
    of: 'of',
    lessons: 'Lessons',
    readQuestion: '🔊 Read question',
  },
};

type FeedbackState = 'idle' | 'correct' | 'wrong';

export default function ExercisesPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { user } = useAuth();
  const { lang } = useLang();
  const ui = UI[lang];
  const { speak, stop } = useTTS();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [starsGained, setStarsGained] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [cardAnim, setCardAnim] = useState('');

  useEffect(() => {
    getExercises(Number(lessonId)).then(setExercises).finally(() => setLoading(false));
    return () => stop();
  }, [lessonId, stop]);

  const current = exercises[index];
  const isLast = index === exercises.length - 1;
  const isDone = index >= exercises.length;

  function readQuestion() {
    if (!current) return;
    speak(current.question, current.question_lang === 'kmr' ? 'kmr' : current.question_lang);
  }

  async function handleChoice(choiceId: number) {
    if (feedback !== 'idle' || submitting || !user) return;
    setSelectedId(choiceId);
    setSubmitting(true);
    try {
      const result = await submitAnswer(current.id, choiceId);
      if (result.is_correct) {
        setFeedback('correct');
        setStarsGained((p) => p + result.stars_earned);
        setCardAnim('correct-bounce');
        setConfetti(true);
        recordStreak();
        setTimeout(() => setConfetti(false), 100);
        const selectedChoice = current.choices.find((c) => c.id === choiceId);
        if (selectedChoice) {
          speak(selectedChoice.text, selectedChoice.lang === 'kmr' ? 'kmr' : selectedChoice.lang);
        }
      } else {
        setFeedback('wrong');
        setCardAnim('wrong-shake');
      }
      setTimeout(() => setCardAnim(''), 600);
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    stop();
    setFeedback('idle');
    setSelectedId(null);
    setIndex((i) => i + 1);
  }

  if (loading) return (
    <div className="flex flex-col items-center gap-4 py-20">
      <Mascot mood="thinking" size="lg" />
      <p className="text-ink-tertiary">{ui.loading}</p>
    </div>
  );

  if (!user) return (
    <div className="text-center py-20 space-y-4">
      <Mascot mood="sad" size="lg" />
      <p className="text-ink-secondary text-lg">{ui.loginMsg}</p>
      <Link href="/auth/login" className="btn-primary inline-block">{ui.loginBtn}</Link>
    </div>
  );

  if (exercises.length === 0) return (
    <div className="text-center py-20 space-y-4">
      <Mascot mood="thinking" size="lg" />
      <p className="text-ink-secondary text-lg">{ui.empty}</p>
      <Link href={`/lessons/${lessonId}`} className="btn-secondary inline-block">{ui.back}</Link>
    </div>
  );

  if (isDone) return (
    <div className="text-center py-16 space-y-6">
      <Confetti active />
      <Mascot mood="excited" size="lg" />
      <h2 className="text-4xl font-extrabold text-primary-800 font-display">{ui.done}</h2>
      <div className="card inline-block px-10 py-6 space-y-2 shadow-glow-accent">
        <p className="text-ink-secondary text-sm">{ui.starsEarned}</p>
        <StarBadge count={starsGained} size="lg" />
      </div>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link href={`/lessons/${lessonId}`} className="btn-secondary">{ui.back}</Link>
        <Link href="/lessons" className="btn-primary">📚 {ui.lessons}</Link>
      </div>
    </div>
  );

  const progress = Math.round((index / exercises.length) * 100);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Confetti active={confetti} />

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-ink-secondary font-medium">
            {ui.question} {index + 1} {ui.of} {exercises.length}
          </span>
          <div className="star-pop">
            <StarBadge count={starsGained} size="sm" />
          </div>
        </div>
        <div className="h-3 bg-surface-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`card space-y-6 border-2 transition-colors duration-300 ${
        feedback === 'correct' ? 'border-success-200 bg-success-50' :
        feedback === 'wrong' ? 'border-danger-100 bg-danger-50' : 'border-transparent'
      } ${cardAnim}`}>

        <div className="text-center">
          <Mascot
            mood={feedback === 'correct' ? 'excited' : feedback === 'wrong' ? 'sad' : 'happy'}
            size="sm"
          />
        </div>

        {current.question_image && (
          <img src={current.question_image} alt="" className="w-full rounded-2xl object-cover max-h-48" />
        )}

        <p className="text-xl font-bold text-ink-primary text-center leading-snug">
          {current.question}
        </p>

        <button
          onClick={readQuestion}
          className="w-full py-3 rounded-2xl bg-primary-50 hover:bg-primary-100 text-primary-600 font-bold text-base transition-colors min-h-[44px]"
        >
          {ui.readQuestion}
        </button>

        {/* Choices */}
        <div className="grid grid-cols-2 gap-3">
          {current.choices.map((choice) => {
            const isSelected = selectedId === choice.id;
            let style = 'border-surface-tertiary bg-surface-elevated hover:border-primary hover:bg-primary-50 hover:scale-105';
            if (isSelected) {
              style = feedback === 'correct'
                ? 'border-success bg-success-50 text-success-800 scale-105'
                : 'border-danger bg-danger-50 text-danger-600';
            } else if (feedback !== 'idle') {
              style = 'border-surface-tertiary bg-surface-secondary text-ink-tertiary';
            }

            return (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                disabled={feedback !== 'idle' || submitting}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 min-h-[44px] ${style}`}
              >
                {choice.text}
              </button>
            );
          })}
        </div>

        {/* Feedback — soft pink for wrong, encouraging tone */}
        {feedback !== 'idle' && (
          <div className={`rounded-2xl p-4 text-center space-y-3 ${
            feedback === 'correct' ? 'bg-success-50' : 'bg-danger-50'
          }`}>
            <p className={`font-extrabold text-lg ${feedback === 'correct' ? 'text-success-600' : 'text-danger-600'}`}>
              {feedback === 'correct' ? ui.correct : ui.wrong}
            </p>
            <button
              onClick={next}
              className={feedback === 'correct' ? 'btn-success' : 'btn-primary'}
            >
              {isLast ? `${ui.finish} 🏆` : ui.next}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
