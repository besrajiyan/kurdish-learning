'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Text-to-Speech hook using ElevenLabs.
 * - Kurdish words: spoken 3 times (with pause between)
 * - German/English words: spoken 1 time
 * - Audio is cached in memory to avoid repeated API calls.
 * - Only ONE audio plays at a time globally — new click kills previous instantly.
 */

const audioCache = new Map<string, string>();

// ---- Global singleton: ensures only one audio plays at a time ---- //
let globalAudio: HTMLAudioElement | null = null;
let globalCancel = false;
let globalSessionId = 0;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

function globalStop() {
  globalCancel = true;
  globalSessionId++;
  if (globalAudio) {
    globalAudio.pause();
    globalAudio.currentTime = 0;
    globalAudio = null;
  }
  notifyListeners();
}

function globalPlayUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    if (globalAudio) {
      globalAudio.pause();
      globalAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    globalAudio = audio;
    audio.onended = () => {
      if (globalAudio === audio) globalAudio = null;
      resolve();
    };
    audio.onerror = () => {
      if (globalAudio === audio) globalAudio = null;
      resolve();
    };
    audio.play().catch(() => {
      if (globalAudio === audio) globalAudio = null;
      resolve();
    });
  });
}

// ---- Fetch + cache ---- //

async function fetchAudio(text: string, lang: string): Promise<string> {
  const cacheKey = `${lang}:${text}`;
  if (audioCache.has(cacheKey)) return audioCache.get(cacheKey)!;

  // Send original text as-is — no conversion
  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
  });

  if (!res.ok) throw new Error('TTS request failed');

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  audioCache.set(cacheKey, url);
  return url;
}

// ---- Hook ---- //

export function useTTS() {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const handler = () => {
      if (mountedRef.current) setSpeakingId(null);
    };
    listeners.add(handler);
    return () => {
      mountedRef.current = false;
      listeners.delete(handler);
    };
  }, []);

  const stop = useCallback(() => {
    globalStop();
    setSpeakingId(null);
  }, []);

  /** Speak text. If preRecordedUrl is provided, use that instead of TTS. */
  const speak = useCallback(
    async (text: string, lang: 'kmr' | 'de' | 'en', id?: string, preRecordedUrl?: string) => {
      globalStop();
      globalCancel = false;
      const session = globalSessionId;
      setSpeakingId(id ?? text);

      try {
        const url = preRecordedUrl || await fetchAudio(text, lang);
        const repeat = lang === 'kmr' ? 3 : 1;

        for (let i = 0; i < repeat; i++) {
          if (globalCancel || globalSessionId !== session) break;
          await globalPlayUrl(url);
          if (i < repeat - 1 && !globalCancel && globalSessionId === session) {
            await new Promise((r) => setTimeout(r, 600));
          }
        }
      } catch (e) {
        console.warn('TTS error:', e);
      }

      if (globalSessionId === session && mountedRef.current) {
        setSpeakingId(null);
      }
    },
    [],
  );

  const speakWord = useCallback(
    async (kmr: string, translation: string, interfaceLang: 'de' | 'en', id?: string) => {
      globalStop();
      globalCancel = false;
      const session = globalSessionId;
      setSpeakingId(id ?? kmr);

      try {
        const [kmrUrl, transUrl] = await Promise.all([
          fetchAudio(kmr, 'kmr'),
          fetchAudio(translation, interfaceLang),
        ]);

        for (let i = 0; i < 3; i++) {
          if (globalCancel || globalSessionId !== session) break;
          await globalPlayUrl(kmrUrl);
          if (i < 2 && !globalCancel && globalSessionId === session) {
            await new Promise((r) => setTimeout(r, 600));
          }
        }

        if (!globalCancel && globalSessionId === session) {
          await new Promise((r) => setTimeout(r, 500));
        }
        if (!globalCancel && globalSessionId === session) {
          await globalPlayUrl(transUrl);
        }
      } catch (e) {
        console.warn('TTS error:', e);
      }

      if (globalSessionId === session && mountedRef.current) {
        setSpeakingId(null);
      }
    },
    [],
  );

  return { speak, speakWord, stop, speakingId };
}
