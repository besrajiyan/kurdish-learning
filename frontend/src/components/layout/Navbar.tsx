'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { useAudience } from '@/store/audience';
import { useLang } from '@/hooks/useLang';
import StarBadge from '@/components/ui/StarBadge';

const UI = {
  de: { lessons: 'Lektionen', parent: 'Eltern', logout: 'Abmelden', login: 'Anmelden', pricing: 'Premium' },
  en: { lessons: 'Lessons', parent: 'Parents', logout: 'Logout', login: 'Login', pricing: 'Premium' },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { audience, isChild } = useAudience();
  const { lang } = useLang();
  const router = useRouter();
  const ui = UI[lang];

  function handleLogout() {
    logout();
    router.push('/');
  }

  // Adult mode: dark sleek navbar
  if (audience === 'adult') {
    return (
      <nav className="bg-primary-900/95 backdrop-blur-sm shadow-lg sticky top-0 z-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight font-display">
            <span className="text-white">kurdi</span>
            <span className="text-primary-200">.ch</span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/60">
              {lang === 'de' ? 'Erwachsene' : 'Adults'}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/lessons" className="hidden sm:flex text-white/60 hover:text-white text-sm font-medium transition-colors min-h-[44px] items-center">
                  {ui.lessons}
                </Link>
                {user.role === 'parent' && (
                  <Link href="/parent" className="hidden sm:flex text-white/60 hover:text-white text-sm font-medium transition-colors min-h-[44px] items-center">
                    {ui.parent}
                  </Link>
                )}
                {!user.is_premium && (
                  <Link href="/pricing" className="hidden sm:flex text-xs font-bold text-primary-900 bg-accent px-3 py-1.5 rounded-full hover:bg-accent-600 transition-colors min-h-[44px] items-center">
                    👑 {ui.pricing}
                  </Link>
                )}
                <span className="text-sm font-semibold text-white/80 hidden sm:block">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-white/40 hover:text-danger transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {ui.logout}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/pricing" className="hidden sm:block text-white/60 hover:text-white text-sm font-medium transition-colors">
                  👑 {ui.pricing}
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-white text-primary-900 text-sm font-bold px-4 py-2 rounded-xl hover:bg-white/90 transition-colors shadow-sm min-h-[44px] flex items-center"
                >
                  {ui.login}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  // Child mode / no audience selected: colorful navbar
  return (
    <nav className={`backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b bg-surface-elevated/80 border-surface-tertiary`}>
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight font-display">
          🦋 <span className="bg-gradient-to-r from-primary-600 to-magic bg-clip-text text-transparent">kurdi.ch</span>
          {audience && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-50 text-accent-600">
              {lang === 'de' ? 'Kinder' : 'Kids'}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/lessons" className="hidden sm:flex text-ink-secondary hover:text-primary text-sm font-medium transition-colors min-h-[44px] items-center">
                {ui.lessons}
              </Link>
              {user.role === 'parent' && (
                <Link href="/parent" className="hidden sm:flex text-ink-secondary hover:text-primary text-sm font-medium transition-colors min-h-[44px] items-center">
                  {ui.parent}
                </Link>
              )}
              {!user.is_premium && (
                <Link href="/pricing" className="hidden sm:flex text-xs font-bold text-white bg-accent px-3 py-1.5 rounded-full hover:bg-accent-600 transition-colors min-h-[44px] items-center">
                  👑 {ui.pricing}
                </Link>
              )}
              <div className="bg-accent-50 border border-accent-200 rounded-full px-3 py-1">
                <StarBadge count={user.total_stars} size="sm" />
              </div>
              <span className="text-sm font-semibold text-ink-primary hidden sm:block">{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-xs text-ink-tertiary hover:text-danger transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {ui.logout}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/pricing" className="hidden sm:block text-ink-secondary hover:text-primary text-sm font-medium transition-colors">
                👑 {ui.pricing}
              </Link>
              <Link
                href="/auth/login"
                className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-primary-600 transition-colors shadow-sm min-h-[44px] flex items-center"
              >
                {ui.login}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
