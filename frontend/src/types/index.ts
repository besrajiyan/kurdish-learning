export type Lang = 'de' | 'en';

export type Audience = 'child' | 'adult';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'child' | 'parent';
  audience: Audience;
  interface_lang: Lang;
  avatar: string | null;
  birth_year: number | null;
  total_stars: number;
  date_joined: string;
  plan: 'free' | 'premium';
  plan_expires: string | null;
  is_premium: boolean;
}

export interface Word {
  id: number;
  kmr: string;
  emoji: string;
  pronunciation: string;
  audio_kmr: string | null;
  de: string;
  en: string;
  image: string | null;
  order: number;
}

export interface LessonSummary {
  id: number;
  title_kmr: string;
  title_de: string;
  title_en: string;
  level: number;
  order: number;
  thumbnail: string | null;
  is_active: boolean;
  word_count: number;
  requires_premium: boolean;
}

export interface LessonDetail extends LessonSummary {
  description_kmr: string;
  description_de: string;
  description_en: string;
  words: Word[];
}

export interface Category {
  id: number;
  name_kmr: string;
  name_de: string;
  name_en: string;
  icon: string;
  order: number;
  audience: 'child' | 'adult' | 'both';
  lessons: LessonSummary[];
}

export interface Choice {
  id: number;
  lang: 'kmr' | 'de' | 'en';
  text: string;
  audio: string | null;
  image: string | null;
  order: number;
}

export interface Exercise {
  id: number;
  exercise_type: 'multiple_choice' | 'matching' | 'fill_blank' | 'listen_select';
  question_lang: 'kmr' | 'de' | 'en';
  question: string;
  question_audio: string | null;
  question_image: string | null;
  order: number;
  stars: number;
  choices: Choice[];
}

export interface LessonProgress {
  id: number;
  lesson: number;
  lesson_title: string;
  is_completed: boolean;
  stars_earned: number;
  completed_at: string | null;
  last_accessed: string;
}

export interface AnswerResult {
  is_correct: boolean;
  stars_earned: number;
  total_stars: number;
}
