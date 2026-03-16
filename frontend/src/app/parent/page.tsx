'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { useLang } from '@/hooks/useLang';
import { getMyChildren, getChildProgress, type ChildSummary, type ChildDetail } from '@/lib/api';
import StarBadge from '@/components/ui/StarBadge';
import ProgressBar from '@/components/ui/ProgressBar';
import Mascot from '@/components/ui/Mascot';

const UI = {
  de: {
    title: 'Eltern-Bereich', subtitle: 'Verfolge den Lernfortschritt deines Kindes',
    noChildren: 'Noch keine Kinder verknüpft. Bitte registriere dein Kind mit deinem Benutzernamen als Elternteil.',
    stars: 'Sterne', completed: 'Abgeschlossen', started: 'Gestartet',
    accuracy: 'Genauigkeit', answers: 'Antworten', back: '← Zurück',
    lessons: 'Lektionen', loading: 'Laden…',
  },
  en: {
    title: 'Parent Dashboard', subtitle: "Track your child's learning progress",
    noChildren: 'No children linked yet. Register your child with your username as parent.',
    stars: 'Stars', completed: 'Completed', started: 'Started',
    accuracy: 'Accuracy', answers: 'Answers', back: '← Back',
    lessons: 'Lessons', loading: 'Loading…',
  },
};

export default function ParentPage() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLang();
  const ui = UI[lang];
  const router = useRouter();

  const [children, setChildren] = useState<ChildSummary[]>([]);
  const [selected, setSelected] = useState<ChildDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { router.push('/auth/login'); return; }
    if (!authLoading && user?.role !== 'parent') { router.push('/'); return; }
    if (user?.role === 'parent') {
      getMyChildren().then(setChildren).finally(() => setLoading(false));
    }
  }, [user, authLoading]);

  async function selectChild(id: number) {
    setSelected(null);
    const detail = await getChildProgress(id);
    setSelected(detail);
  }

  if (authLoading || loading) return (
    <div className="flex flex-col items-center gap-4 py-20">
      <Mascot mood="thinking" size="lg" />
      <p className="text-ink-tertiary">{ui.loading}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="text-5xl">👨‍👩‍👧</div>
        <h1 className="text-3xl font-extrabold text-primary-800 font-display">{ui.title}</h1>
        <p className="text-ink-secondary">{ui.subtitle}</p>
      </div>

      {children.length === 0 ? (
        <div className="card text-center space-y-4 py-10">
          <Mascot mood="thinking" />
          <p className="text-ink-secondary max-w-sm mx-auto">{ui.noChildren}</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => selectChild(child.id)}
                className={`card text-left space-y-3 border-2 transition-all min-h-[44px] ${
                  selected?.child.id === child.id
                    ? 'border-primary bg-primary-50'
                    : 'border-transparent hover:border-primary-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-xl">
                    {child.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-extrabold text-ink-primary">{child.username}</p>
                    <StarBadge count={child.total_stars} size="sm" />
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-ink-secondary">
                  <span>✓ {child.lessons_completed} {ui.completed}</span>
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-extrabold text-2xl">
                  {selected.child.username[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-primary-800 font-display">{selected.child.username}</h2>
                  <StarBadge count={selected.child.total_stars} size="md" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: ui.completed, value: selected.stats.lessons_completed, icon: '✅', color: 'text-success' },
                  { label: ui.started, value: selected.stats.lessons_started, icon: '📖', color: 'text-primary' },
                  { label: ui.answers, value: selected.stats.total_answers, icon: '💬', color: 'text-magic' },
                  { label: ui.accuracy, value: `${selected.stats.accuracy}%`, icon: '🎯', color: 'text-accent-600' },
                ].map((s) => (
                  <div key={s.label} className="card text-center space-y-1">
                    <p className="text-2xl">{s.icon}</p>
                    <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-ink-tertiary">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="card space-y-3">
                <h3 className="font-bold text-ink-primary">🎯 {ui.accuracy}</h3>
                <ProgressBar
                  value={selected.stats.accuracy}
                  color={selected.stats.accuracy >= 70 ? 'bg-success' : 'bg-accent'}
                  label={`${selected.stats.correct_answers} / ${selected.stats.total_answers}`}
                />
              </div>

              {selected.lesson_progress.length > 0 && (
                <div className="card space-y-4">
                  <h3 className="font-bold text-ink-primary">📚 {ui.lessons}</h3>
                  <div className="space-y-3">
                    {selected.lesson_progress.map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 min-w-0">
                          <span>{p.is_completed ? '✅' : '📖'}</span>
                          <span className="text-sm font-medium text-ink-primary truncate">{p.lesson_title}</span>
                        </div>
                        <StarBadge count={p.stars_earned} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
