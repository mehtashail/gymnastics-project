import { useState } from 'react';
import { AIFeedback, Skill } from '../types';
import { analyzeVideo } from '../services/videoAnalysis';

type Status = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';

export function useVideoAnalysis() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function analyze(videoUri: string, skill: Skill): Promise<AIFeedback | null> {
    setStatus('uploading');
    setError(null);
    setFeedback(null);
    try {
      setStatus('analyzing');
      const result = await analyzeVideo(videoUri, skill.id);
      setFeedback(result);
      setStatus('done');
      return result;
    } catch (e: any) {
      setError(e.message || 'Analysis failed');
      setStatus('error');
      return null;
    }
  }

  function reset() {
    setStatus('idle');
    setFeedback(null);
    setError(null);
  }

  return { status, feedback, error, analyze, reset };
}
