import type { User, Category, LessonDetail, Exercise, LessonProgress, AnswerResult } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://kurdish-learning-backend.onrender.com/api/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('API error'), { status: res.status, data: err });
  }
  return res.json();
}

// Auth
export async function register(data: {
  username: string; email: string; password: string; password2: string;
  role: string; audience?: string; interface_lang: string; birth_year?: number;
}) {
  return request('/users/register/', { method: 'POST', body: JSON.stringify(data) });
}
export async function login(username: string, password: string): Promise<{ access: string; refresh: string }> {
  return request('/users/login/', { method: 'POST', body: JSON.stringify({ username, password }) });
}
export async function refreshToken(refresh: string): Promise<{ access: string }> {
  return request('/users/token/refresh/', { method: 'POST', body: JSON.stringify({ refresh }) });
}
export async function getMe(): Promise<User> { return request('/users/me/'); }
export async function updateMe(data: Partial<User>): Promise<User> {
  return request('/users/me/', { method: 'PATCH', body: JSON.stringify(data) });
}

// Lessons
export async function getCategories(audience?: string): Promise<Category[]> {
  const q = audience ? `?audience=${audience}` : '';
  return request(`/lessons/categories/${q}`);
}
export async function getLessons(params?: { category?: number; level?: number; audience?: string }) {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', String(params.category));
  if (params?.level) q.set('level', String(params.level));
  if (params?.audience) q.set('audience', params.audience);
  return request<LessonDetail[]>(`/lessons/?${q}`);
}
export async function getLesson(id: number): Promise<LessonDetail> { return request(`/lessons/${id}/`); }

// Exercises
export async function getExercises(lessonId: number): Promise<Exercise[]> {
  return request(`/exercises/?lesson=${lessonId}`);
}
export async function submitAnswer(exerciseId: number, choiceId: number): Promise<AnswerResult> {
  return request('/exercises/answer/', { method: 'POST', body: JSON.stringify({ exercise_id: exerciseId, choice_id: choiceId }) });
}

// Progress
export async function getMyProgress(): Promise<LessonProgress[]> { return request('/progress/me/'); }

// Parent dashboard
export interface ChildSummary {
  id: number; username: string; total_stars: number;
  avatar: string | null; lessons_completed: number;
}
export interface ChildDetail {
  child: { id: number; username: string; total_stars: number; avatar: string | null };
  stats: { lessons_completed: number; lessons_started: number; total_answers: number; correct_answers: number; accuracy: number };
  lesson_progress: LessonProgress[];
}
export async function getMyChildren(): Promise<ChildSummary[]> { return request('/progress/children/'); }
export async function getChildProgress(childId: number): Promise<ChildDetail> {
  return request(`/progress/children/${childId}/`);
}
