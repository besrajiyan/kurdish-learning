'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Simple voice recorder hook using MediaRecorder API.
 * Records user's voice and returns a playable audio URL.
 */
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async (id?: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRef.current = recorder;
      chunksRef.current = [];
      setRecordingId(id ?? null);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecording(false);
        // Stop all tracks to release microphone
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setRecording(true);
      setAudioUrl(null);

      // Auto-stop after 5 seconds (enough for a single word)
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 5000);
    } catch (e) {
      console.warn('Microphone access denied:', e);
      setRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRef.current?.state === 'recording') {
      mediaRef.current.stop();
    }
  }, []);

  const playRecording = useCallback(() => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  }, [audioUrl]);

  const clear = useCallback(() => {
    setAudioUrl(null);
    setRecordingId(null);
  }, []);

  return {
    recording,
    audioUrl,
    recordingId,
    startRecording,
    stopRecording,
    playRecording,
    clear,
  };
}
