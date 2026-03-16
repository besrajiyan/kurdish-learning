import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.ELEVENLABS_API_KEY;

// Multilingual v2 voice — warm, friendly female voice
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'TTS not configured' }, { status: 500 });
  }

  try {
    const { text, lang } = await req.json();

    if (!text || typeof text !== 'string' || text.length > 500) {
      return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
    }

    // For Kurdish: send original text, no language_code — let the model auto-detect
    // For German/English: send with language_code for accuracy
    const body: Record<string, unknown> = {
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.75,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true,
      },
    };

    // Only set language_code for supported languages
    if (lang === 'de') body.language_code = 'de';
    if (lang === 'en') body.language_code = 'en';
    // Kurdish (kmr): no language_code — model reads Latin script naturally

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('ElevenLabs error:', res.status, err);
      return NextResponse.json({ error: 'TTS failed' }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    console.error('TTS error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
