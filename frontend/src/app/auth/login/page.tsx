'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login as apiLogin } from '@/lib/api';
import { useAuth } from '@/store/auth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { access, refresh } = await apiLogin(form.username, form.password);
      await login(access, refresh);
      router.push('/lessons');
    } catch {
      setError('Benutzername oder Passwort falsch. / Username or password incorrect.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="card space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-2">🦋</div>
          <h1 className="text-2xl font-extrabold text-primary-800 font-display">Anmelden / Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input"
            placeholder="Benutzername / Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Passwort / Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="text-danger text-sm text-center">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? '...' : 'Anmelden / Login'}
          </button>
        </form>

        <p className="text-center text-sm text-ink-secondary">
          Neu hier?{' '}
          <Link href="/auth/register" className="text-primary font-semibold hover:underline">
            Registrieren / Register
          </Link>
        </p>
      </div>
    </div>
  );
}
