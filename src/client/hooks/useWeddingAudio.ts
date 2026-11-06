import { useState, useEffect, useRef } from 'react';

export function useWeddingAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const currentNoteIndexRef = useRef<number>(0);

  // Romantic wedding progression frequencies (Canon in D / Wedding Melody)
  const melodyNotes = [
    { freq: 587.33, len: 0.9, bass: 146.83 }, // D5, D3
    { freq: 554.37, len: 0.9, bass: 110.00 }, // C#5, A2
    { freq: 493.88, len: 0.9, bass: 123.47 }, // B4, B2
    { freq: 440.00, len: 0.9, bass: 92.50 },  // A4, F#2
    { freq: 392.00, len: 0.9, bass: 98.00 },  // G4, G2
    { freq: 440.00, len: 0.9, bass: 146.83 }, // A4, D3
    { freq: 493.88, len: 0.9, bass: 98.00 },  // B4, G2
    { freq: 554.37, len: 0.9, bass: 110.00 }, // C#5, A2
    { freq: 587.33, len: 1.2, bass: 146.83 }, // D5, D3
    { freq: 659.25, len: 0.6, bass: 110.00 }, // E5
    { freq: 739.99, len: 1.5, bass: 123.47 }, // F#5
    { freq: 659.25, len: 0.8, bass: 92.50 },  // E5
    { freq: 587.33, len: 0.8, bass: 98.00 },  // D5
    { freq: 493.88, len: 1.2, bass: 146.83 }, // B4
    { freq: 440.00, len: 1.6, bass: 110.00 }, // A4
  ];

  const ensureAudioContext = async () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound effect: Crisp paper unfold & gentle harp sparkle when opening the invitation
  const playEnvelopeOpeningSound = async () => {
    try {
      const ctx = await ensureAudioContext();
      const now = ctx.currentTime;

      // 1. Paper rustle noise
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(3, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // 2. Rising magical chime harp
      const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chimeFreqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);

        g.gain.setValueAtTime(0, now + idx * 0.08);
        g.gain.linearRampToValueAtTime(0.09, now + idx * 0.08 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.9);
      });
    } catch {
      // Audio fallback
    }
  };

  const playChimeNote = (freq: number, duration: number, bassFreq?: number) => {
    if (!audioCtxRef.current || isMuted) return;

    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // Melody tone (Piano / Bell combination)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Warm harmonic overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.03, now + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);

      // Soft Warm Bass Accompaniment
      if (bassFreq) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(0, now);
        bassGain.gain.linearRampToValueAtTime(0.06, now + 0.06);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.4);

        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + duration * 1.4);
      }
    } catch {
      // Audio playback handling
    }
  };

  const startMusic = async () => {
    try {
      await ensureAudioContext();
      setIsPlaying(true);

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = window.setInterval(() => {
        const note = melodyNotes[currentNoteIndexRef.current % melodyNotes.length];
        playChimeNote(note.freq, note.len, note.bass);
        currentNoteIndexRef.current = (currentNoteIndexRef.current + 1) % melodyNotes.length;
      }, 720);
    } catch {
      // Handled
    }
  };

  const pauseMusic = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    setIsMuted,
    startMusic,
    pauseMusic,
    toggleMusic,
    playEnvelopeOpeningSound,
  };
}
