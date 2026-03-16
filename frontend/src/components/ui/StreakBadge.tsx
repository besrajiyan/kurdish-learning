'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/types';

const UI = {
  de: { streak: 'Tage in Folge', today: 'Heute gelernt!', notYet: 'Starte heute!' },
  en: { streak: 'day streak', today: 'Learned today!', notYet: 'Start today!' },
};

function getStreak(): { count: number; learnedToday: boolean } {
  if (typeof window === 'undefined') return { count: 0, learnedToday: false };

  const raw = localStorage.getItem('kurdi_streak');
  const today = new Date().toISOString().slice(0, 10);

  if (!raw) {
    return { count: 0, learnedToday: false };
  }

  try {
    const data = JSON.parse(raw);
    const lastDate = data.lastDate || '';
    const count = data.count || 0;

    if (lastDate === today) {
      return { count, learnedToday: true };
    }

    // Check if yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    if (lastDate === yesterdayStr) {
      return { count, learnedToday: false };
    }

    // Streak broken
    return { count: 0, learnedToday: false };
  } catch {
    return { count: 0, learnedToday: false };
  }
}

export function recordStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const { count, learnedToday } = getStreak();

  if (!learnedToday) {
    localStorage.setItem('kurdi_streak', JSON.stringify({
      lastDate: today,
      count: count + 1,
    }));
  }
}

export default function StreakBadge({ lang }: { lang: Lang }) {
  const [streak, setStreak] = useState({ count: 0, learnedToday: false });

  useEffect(() => {
    setStreak(getStreak());
  }, []);

  const ui = UI[lang];

  return (
    <div className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-full px-4 py-2">
      <span className="text-2xl">🔥</span>
      <div className="text-left">
        <p className="text-sm font-extrabold text-accent-800">
          {streak.count} {ui.streak}
        </p>
        <p className="text-xs text-accent-600">
          {streak.learnedToday ? '✓ ' + ui.today : ui.notYet}
        </p>
      </div>
    </div>
  );
}
