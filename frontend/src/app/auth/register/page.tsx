'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register, login as apiLogin } from '@/lib/api';
import { useAuth } from '@/store/auth';
import { useAudience } from '@/store/audience';

export default function RegisterPage() {
  const { login } = useAuth();
  const { audience, setAudience } = useAudience();
  const router = useRouter();
  const [form, setForm] = useState({
    username: '', email: '', password: '', password2: '',
    interface_lang: 'de', birth_year: '',
    audience: audience || 'child' as 'child' | 'adult',
    role: 'child' as 'child' | 'parent',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isChildMode = form.audience === 'child';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.password2) {
      setError('Passworter stimmen nicht uberein. / Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register({
        username: form.username, email: form.email,
        password: form.password, password2: form.password2,
        role: form.role, interface_lang: form.interface_lang,
        audience: form.audience,
        ...(form.birth_year ? { birth_year: parseInt(form.birth_year) } : {}),
      });
      const { access, refresh } = await apiLogin(form.username, form.password);
      await login(access, refresh);
      setAudience(form.audience);
      router.push('/lessons');
    } catch (err: any) {
      const detail = err?.data ? Object.values(err.data).flat().join(' ') : '';
      setError(detail || 'Registrierung fehlgeschlagen. / Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="card space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-2">{isChildMode ? '🦋' : '🎓'}</div>
          <h1 className="text-2xl font-extrabold text-primary-800 font-display">
            Registrieren / Register
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Audience selection */}
          <div className="flex gap-2">
            <button type="button"
              onClick={() => setForm({ ...form, audience: 'child', role: 'child' })}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all min-h-[44px] ${
                isChildMode
                  ? 'border-accent bg-accent-50 text-accent-800 shadow-sm'
                  : 'border-surface-tertiary text-ink-secondary hover:border-accent-200'
              }`}
            >
              🧒 {form.interface_lang === 'de' ? 'Kind' : 'Child'}
            </button>
            <button type="button"
              onClick={() => setForm({ ...form, audience: 'adult', role: 'child' })}
              className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all min-h-[44px] ${
                !isChildMode
                  ? 'border-primary bg-primary-50 text-primary-800 shadow-sm'
                  : 'border-surface-tertiary text-ink-secondary hover:border-primary-200'
              }`}
            >
              🎓 {form.interface_lang === 'de' ? 'Erwachsen' : 'Adult'}
            </button>
          </div>

          <input className="input" placeholder="Benutzername / Username"
            value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          <input className="input" type="email" placeholder="E-Mail"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" type="password" placeholder="Passwort / Password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input className="input" type="password" placeholder="Passwort wiederholen / Confirm password"
            value={form.password2} onChange={(e) => setForm({ ...form, password2: e.target.value })} required />

          {isChildMode && (
            <input className="input" type="number" placeholder="Geburtsjahr / Birth year (optional)"
              value={form.birth_year} onChange={(e) => setForm({ ...form, birth_year: e.target.value })}
              min={2010} max={2022} />
          )}

          {/* Role selection for adults */}
          {!isChildMode && (
            <div className="flex gap-2">
              <button type="button"
                onClick={() => setForm({ ...form, role: 'child' })}
                className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm transition-colors min-h-[44px] ${
                  form.role === 'child'
                    ? 'border-primary bg-primary-50 text-primary-600'
                    : 'border-surface-tertiary text-ink-secondary'
                }`}
              >
                📖 {form.interface_lang === 'de' ? 'Lernende/r' : 'Learner'}
              </button>
              <button type="button"
                onClick={() => setForm({ ...form, role: 'parent' })}
                className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm transition-colors min-h-[44px] ${
                  form.role === 'parent'
                    ? 'border-primary bg-primary-50 text-primary-600'
                    : 'border-surface-tertiary text-ink-secondary'
                }`}
              >
                👪 {form.interface_lang === 'de' ? 'Elternteil' : 'Parent'}
              </button>
            </div>
          )}

          {/* Language selection */}
          <div className="flex gap-2">
            {(['de', 'en'] as const).map((l) => (
              <button key={l} type="button"
                onClick={() => setForm({ ...form, interface_lang: l })}
                className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm transition-colors min-h-[44px] ${
                  form.interface_lang === l
                    ? 'border-primary bg-primary-50 text-primary-600'
                    : 'border-surface-tertiary text-ink-secondary'
                }`}
              >
                {l === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
              </button>
            ))}
          </div>

          {error && <p className="text-danger text-sm text-center">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? '...' : 'Registrieren / Register'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-secondary">
          {form.interface_lang === 'de' ? 'Schon registriert?' : 'Already registered?'}{' '}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            {form.interface_lang === 'de' ? 'Anmelden' : 'Login'}
          </Link>
        </p>
      </div>
    </div>
  );
}
