import { AIFeedback } from '../types';
import { api } from './api';

export async function analyzeVideo(videoUri: string, skillId: string): Promise<AIFeedback> {
  const formData = new FormData();

  // React Native FormData handles URI-based file uploads
  formData.append('video', {
    uri: videoUri,
    name: 'gymnastics_video.mov',
    type: 'video/quicktime',
  } as any);
  formData.append('skillId', skillId);

  const response = await api.post<AIFeedback>('/api/analyze-video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
