'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/store/auth';
import { useLang } from '@/hooks/useLang';
import Mascot from '@/components/ui/Mascot';

const UI = {
  de: {
    title: 'Wähle deinen Plan',
    subtitle: 'Lerne Kurmanci — kostenlos oder mit Premium!',
    free: 'Kostenlos',
    premium: 'Premium',
    monthly: '/ Monat',
    currentPlan: 'Dein Plan',
    getPremium: 'Premium kaufen 👑',
    buying: 'Wird geladen...',
    successTitle: 'Willkommen bei Premium! 🎉',
    successMsg: 'Du hast jetzt Zugang zu allen Lektionen und Funktionen!',
    canceledMsg: 'Kauf abgebrochen. Du kannst es jederzeit erneut versuchen.',
    freeFeatures: [
      { text: '3 Lektionen (A1)', ok: true },
      { text: 'Grundlegende Übungen', ok: true },
      { text: 'Sterne sammeln', ok: true },
      { text: 'Alle Lektionen (A1–C2)', ok: false },
      { text: 'Sprachausgabe (TTS)', ok: false },
      { text: 'Eltern-Dashboard', ok: false },
      { text: 'Ohne Werbung', ok: false },
    ],
    premiumFeatures: [
      { text: 'Alle Lektionen (A1–C2)', ok: true },
      { text: 'Unbegrenzte Übungen', ok: true },
      { text: 'Sterne sammeln', ok: true },
      { text: 'Sprachausgabe (TTS)', ok: true },
      { text: 'Eltern-Dashboard', ok: true },
      { text: 'Ohne Werbung', ok: true },
      { text: 'Neue Inhalte zuerst', ok: true },
    ],
    install: 'App installieren',
    installDesc: 'Installiere kurdi.ch als App auf deinem Handy!',
    installSteps: [
      '📱 Öffne kurdi.ch im Browser',
      '⬆️ Tippe auf "Teilen" (iOS) oder ⋮ (Android)',
      '➕ Wähle "Zum Startbildschirm"',
    ],
  },
  en: {
    title: 'Choose your plan',
    subtitle: 'Learn Kurmanji — free or with Premium!',
    free: 'Free',
    premium: 'Premium',
    monthly: '/ month',
    currentPlan: 'Your plan',
    getPremium: 'Get Premium 👑',
    buying: 'Loading...',
    successTitle: 'Welcome to Premium! 🎉',
    successMsg: 'You now have access to all lessons and features!',
    canceledMsg: 'Purchase canceled. You can try again anytime.',
    freeFeatures: [
      { text: '3 Lessons (A1)', ok: true },
      { text: 'Basic exercises', ok: true },
      { text: 'Collect stars', ok: true },
      { text: 'All lessons (A1–C2)', ok: false },
      { text: 'Text-to-speech (TTS)', ok: false },
      { text: 'Parent dashboard', ok: false },
      { text: 'Ad-free', ok: false },
    ],
    premiumFeatures: [
      { text: 'All lessons (A1–C2)', ok: true },
      { text: 'Unlimited exercises', ok: true },
      { text: 'Collect stars', ok: true },
      { text: 'Text-to-speech (TTS)', ok: true },
      { text: 'Parent dashboard', ok: true },
      { text: 'Ad-free', ok: true },
      { text: 'New content first', ok: true },
    ],
    install: 'Install App',
    installDesc: 'Install kurdi.ch as an app on your phone!',
    installSteps: [
      '📱 Open kurdi.ch in your browser',
      '⬆️ Tap "Share" (iOS) or ⋮ (Android)',
      '➕ Select "Add to Home Screen"',
    ],
  },
};

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-ink-tertiary">...</div>}>
      <PricingContent />
    </Suspense>
  );
}

function PricingContent() {
  const { user, refreshUser } = useAuth();
  const { lang } = useLang();
  const ui = UI[lang];
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const isSuccess = searchParams.get('success') === 'true';
  const isCanceled = searchParams.get('canceled') === 'true';

  // Refresh user data after successful checkout to update premium status
  useEffect(() => {
    if (isSuccess) {
      refreshUser();
    }
  }, [isSuccess]);

  async function handleBuyPremium() {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          email: user?.email,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error('Checkout error:', e);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      {/* Success/Cancel messages */}
      {isSuccess && (
        <div className="card bg-success-50 border-2 border-success text-center space-y-3 py-8">
          <Mascot mood="excited" size="lg" />
          <h2 className="text-2xl font-extrabold text-success-600 font-display">{ui.successTitle}</h2>
          <p className="text-ink-secondary">{ui.successMsg}</p>
        </div>
      )}
      {isCanceled && (
        <div className="card bg-accent-50 border-2 border-accent text-center py-6">
          <p className="text-ink-secondary">{ui.canceledMsg}</p>
        </div>
      )}

      <div className="text-center space-y-3">
        <Mascot mood="excited" size="lg" />
        <h1 className="text-3xl font-extrabold text-primary-800 font-display">{ui.title}</h1>
        <p className="text-ink-secondary">{ui.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Free */}
        <div className={`card border-2 space-y-4 ${
          user?.plan === 'free' ? 'border-primary-200' : 'border-surface-tertiary'
        }`}>
          <div className="text-center space-y-1">
            <p className="text-4xl">🆓</p>
            <h2 className="text-2xl font-extrabold text-ink-primary font-display">{ui.free}</h2>
            <p className="text-3xl font-extrabold text-primary">0 CHF</p>
          </div>
          <ul className="space-y-2 text-sm">
            {ui.freeFeatures.map((f) => (
              <li key={f.text} className={`flex items-center gap-2 ${f.ok ? 'text-ink-primary' : 'text-ink-tertiary'}`}>
                <span className={f.ok ? 'text-success' : 'text-ink-tertiary'}>{f.ok ? '✓' : '✕'}</span>
                {f.text}
              </li>
            ))}
          </ul>
          {user?.plan === 'free' && (
            <div className="text-center">
              <span className="text-sm font-bold text-primary bg-primary-50 px-4 py-2 rounded-full">
                {ui.currentPlan} ✓
              </span>
            </div>
          )}
        </div>

        {/* Premium */}
        <div className="card border-2 border-accent space-y-4 relative overflow-hidden shadow-glow-accent">
          <div className="absolute top-0 right-0 bg-accent text-accent-900 text-xs font-bold px-4 py-1 rounded-bl-xl">
            ⭐ PREMIUM
          </div>
          <div className="text-center space-y-1 pt-4">
            <p className="text-4xl">👑</p>
            <h2 className="text-2xl font-extrabold text-ink-primary font-display">{ui.premium}</h2>
            <p className="text-3xl font-extrabold text-accent-600">
              10 CHF <span className="text-base font-normal text-ink-tertiary">{ui.monthly}</span>
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {ui.premiumFeatures.map((f) => (
              <li key={f.text} className="flex items-center gap-2 text-ink-primary font-medium">
                <span className="text-success">✓</span>
                {f.text}
              </li>
            ))}
          </ul>
          <div className="text-center">
            {user?.is_premium ? (
              <span className="text-sm font-bold text-success bg-success-50 px-4 py-2 rounded-full">
                {ui.currentPlan} ✓
              </span>
            ) : (
              <button
                onClick={handleBuyPremium}
                disabled={loading}
                className="btn-accent w-full text-lg"
              >
                {loading ? ui.buying : ui.getPremium}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Install App */}
      <div className="card bg-surface-secondary max-w-2xl mx-auto space-y-4 text-center">
        <p className="text-4xl">📲</p>
        <h2 className="text-2xl font-extrabold text-primary-800 font-display">{ui.install}</h2>
        <p className="text-ink-secondary">{ui.installDesc}</p>
        <div className="space-y-2 text-left max-w-xs mx-auto">
          {ui.installSteps.map((step) => (
            <p key={step} className="text-sm text-ink-primary">{step}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
