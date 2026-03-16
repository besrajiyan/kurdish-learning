'use client';

import { useAuth } from '@/store/auth';
import type { Lang } from '@/types';

/**
 * Returns the correct field based on the user's interface language.
 * Falls back to kmr if de/en is not available.
 *
 * Example: t({ de: 'Tiere', en: 'Animals', kmr: 'Ajal' }) → 'Tiere'
 */
export function useLang() {
  const { user } = useAuth();
  const lang: Lang = user?.interface_lang ?? 'de';

  function t(fields: { de: string; en: string; kmr?: string }): string {
    return fields[lang] ?? fields.kmr ?? '';
  }

  return { lang, t };
}
