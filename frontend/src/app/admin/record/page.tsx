'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '@/store/auth';
import { useRouter } from 'next/navigation';

interface WordRecord {
  id: number;
  kmr: string;
  emoji: string;
  pronunciation: string;
  de: string;
  en: string;
  has_audio: boolean;
  audio_url: string | null;
  lesson_title: string;
  level: number;
}

const LEVEL_LABELS: Record<number, string> = {
  1: 'A1', 2: 'A2', 3: 'B1', 4: 'B2', 5: 'C1', 6: 'C2',
};

export default function RecordPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [words, setWords] = useState<WordRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [recordingId, setRecordingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  useEffect(() => {
    if (!token) { router.push('/auth/login'); return; }
    fetch('http://localhost:8000/api/v1/lessons/words/recording-list/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Not admin');
        return r.json();
      })
      .then(setWords)
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [token, router]);

  const startRecording = useCallback(async (wordId: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRef.current = recorder;
      chunksRef.current = [];
      setRecordingId(wordId);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setRecordingId(null);

        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await uploadAudio(wordId, blob);
      };

      recorder.start();

      // Auto-stop after 4 seconds
      setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 4000);
    } catch {
      setRecordingId(null);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRef.current?.state === 'recording') {
      mediaRef.current.stop();
    }
  }, []);

  async function uploadAudio(wordId: number, blob: Blob) {
    setUploading(wordId);
    const formData = new FormData();
    formData.append('audio', blob, `word_${wordId}.webm`);

    try {
      const res = await fetch(`http://localhost:8000/api/v1/lessons/words/${wordId}/upload-audio/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setWords((prev) =>
          prev.map((w) =>
            w.id === wordId ? { ...w, has_audio: true, audio_url: data.audio_kmr } : w
          )
        );
      }
    } finally {
      setUploading(null);
    }
  }

  function playAudio(url: string) {
    new Audio(url).play();
  }

  if (loading) return <p className="text-center text-ink-tertiary py-20">Loading...</p>;

  const grouped = words.reduce<Record<string, WordRecord[]>>((acc, w) => {
    const key = `${LEVEL_LABELS[w.level]} — ${w.lesson_title}`;
    (acc[key] ??= []).push(w);
    return acc;
  }, {});

  const recorded = words.filter((w) => w.has_audio).length;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-primary-800 font-display">🎙️ Ses Kayıt Paneli</h1>
        <p className="text-ink-secondary">Her kelimeyi tıkla, söyle, kaydet. Tüm kullanıcılar senin sesini duyacak.</p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="bg-success-50 text-success-600 px-3 py-1 rounded-full font-bold">
            ✓ {recorded} kayıtlı
          </span>
          <span className="bg-danger-50 text-danger-600 px-3 py-1 rounded-full font-bold">
            ✕ {words.length - recorded} eksik
          </span>
        </div>
      </div>

      {Object.entries(grouped).map(([group, groupWords]) => (
        <section key={group} className="space-y-3">
          <h2 className="text-lg font-bold text-ink-primary font-display">{group}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {groupWords.map((word) => {
              const isRec = recordingId === word.id;
              const isUp = uploading === word.id;

              return (
                <div
                  key={word.id}
                  className={`card p-4 space-y-2 border-2 transition-all ${
                    isRec ? 'border-danger bg-danger-50' :
                    word.has_audio ? 'border-success-200 bg-success-50' :
                    'border-surface-tertiary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{word.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-primary-600">{word.kmr}</p>
                      <p className="text-xs text-ink-tertiary">{word.de} / {word.en}</p>
                    </div>
                    {word.has_audio && <span className="text-success text-lg">✓</span>}
                  </div>

                  <div className="flex gap-2">
                    {/* Record */}
                    <button
                      onClick={() => isRec ? stopRecording() : startRecording(word.id)}
                      disabled={isUp}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold min-h-[44px] transition-all ${
                        isRec
                          ? 'bg-danger text-white animate-pulse'
                          : 'bg-danger-50 text-danger-600 hover:bg-danger-100'
                      }`}
                    >
                      {isRec ? '⏹️ Dur' : isUp ? '⏳...' : '🎙️ Kaydet'}
                    </button>

                    {/* Play */}
                    {word.audio_url && (
                      <button
                        onClick={() => playAudio(word.audio_url!)}
                        className="py-2 px-3 rounded-xl text-sm font-bold bg-primary-50 text-primary-600 hover:bg-primary-100 min-h-[44px]"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
