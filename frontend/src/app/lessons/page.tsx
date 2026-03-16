'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCategories } from '@/lib/api';
import { useAuth } from '@/store/auth';
import { useAudience } from '@/store/audience';
import { useLang } from '@/hooks/useLang';
import LevelBadge from '@/components/ui/LevelBadge';
import type { Category } from '@/types';

const LEVELS = [
  { value: 0, de: 'Alle', en: 'All' },
  { value: 1, de: 'A1', en: 'A1' },
  { value: 2, de: 'A2', en: 'A2' },
  { value: 3, de: 'B1', en: 'B1' },
  { value: 4, de: 'B2', en: 'B2' },
  { value: 5, de: 'C1', en: 'C1' },
  { value: 6, de: 'C2', en: 'C2' },
];

const UI = {
  de: { title: 'Lektionen', loading: 'Laden...', empty: 'Keine Lektionen gefunden.', words: 'Worter' },
  en: { title: 'Lessons', loading: 'Loading...', empty: 'No lessons found.', words: 'words' },
};

export default function LessonsPage() {
  const { lang, t } = useLang();
  const { user } = useAuth();
  const { audience, isChild, isAdult } = useAudience();
  const router = useRouter();
  const ui = UI[lang];
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCategories(audience || undefined)
      .then((data) => { if (!cancelled) setCategories(data); })
      .catch(() => { if (!cancelled) setCategories([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [audience]);

  if (loading) return <p className="text-center text-ink-tertiary py-20">{ui.loading}</p>;

  // For children, only show A1 level filter (simpler interface)
  const visibleLevels = isChild ? LEVELS.filter(l => l.value <= 2) : LEVELS;

  const filtered = categories
    .map((cat) => ({
      ...cat,
      lessons: filterLevel === 0 ? cat.lessons : cat.lessons.filter((l) => l.level === filterLevel),
    }))
    .filter((cat) => cat.lessons.length > 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={`font-extrabold font-display ${
          isChild ? 'text-3xl text-primary-800' : 'text-2xl text-ink-primary'
        }`}>
          {isChild ? '📚 ' : ''}{ui.title}
        </h1>
        <div className="flex gap-1.5 flex-wrap">
          {visibleLevels.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => setFilterLevel(lvl.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] flex items-center ${
                filterLevel === lvl.value
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface-secondary text-ink-secondary hover:bg-primary-50 hover:text-primary'
              }`}
            >
              {lvl[lang]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="text-ink-tertiary text-center py-10">{ui.empty}</p>
      )}

      {filtered.map((cat) => (
        <section key={cat.id} className="space-y-4">
          <h2 className={`font-bold text-ink-primary flex items-center gap-2 font-display ${
            isChild ? 'text-xl' : 'text-lg'
          }`}>
            {cat.icon && <span>{cat.icon}</span>}
            <span>{t({ de: cat.name_de, en: cat.name_en, kmr: cat.name_kmr })}</span>
            <span className="text-primary font-normal text-sm">— {cat.name_kmr}</span>
          </h2>

          <div className={`grid gap-4 ${isChild ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {cat.lessons.map((lesson) => {
              const locked = lesson.requires_premium && !user?.is_premium;
              return locked ? (
                <div
                  key={lesson.id}
                  onClick={() => router.push('/pricing')}
                  className={`card group cursor-pointer border-2 border-transparent hover:border-accent-200 space-y-3 min-h-[44px] opacity-75 relative ${
                    isChild ? '' : 'p-4'
                  }`}
                >
                  <div className="absolute top-3 right-3 text-lg">🔒</div>
                  <div>
                    <p className="font-bold text-ink-secondary">
                      {t({ de: lesson.title_de, en: lesson.title_en })}
                    </p>
                    <p className="text-ink-tertiary text-sm font-medium">{lesson.title_kmr}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LevelBadge level={lesson.level} lang={lang} />
                    <span className="text-xs text-ink-tertiary">{lesson.word_count} {ui.words}</span>
                    <span className="text-xs font-bold text-accent-600 ml-auto">Premium</span>
                  </div>
                </div>
              ) : (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                  <div className={`card group cursor-pointer border-2 border-transparent hover:border-primary-200 space-y-3 min-h-[44px] ${
                    isChild ? '' : 'p-4'
                  }`}>
                    <div>
                      <p className={`font-bold text-ink-primary group-hover:text-primary transition-colors ${
                        isChild ? '' : 'text-sm'
                      }`}>
                        {t({ de: lesson.title_de, en: lesson.title_en })}
                      </p>
                      <p className={`text-primary font-medium ${isChild ? 'text-sm' : 'text-xs'}`}>
                        {lesson.title_kmr}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <LevelBadge level={lesson.level} lang={lang} />
                      <span className="text-xs text-ink-tertiary">{lesson.word_count} {ui.words}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
