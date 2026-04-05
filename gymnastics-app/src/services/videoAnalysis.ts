import { Platform } from 'react-native';
import { AIFeedback } from '../types';
import { api } from './api';

export async function analyzeVideo(videoUri: string, skillId: string): Promise<AIFeedback> {
  const formData = new FormData();

  if (Platform.OS === 'web') {
    // On web, expo-image-picker returns a blob: URL via URL.createObjectURL().
    // We must fetch the blob and append a real File object — the browser's
    // native FormData cannot accept the React Native { uri, name, type } shape.
    const response = await fetch(videoUri);
    const blob = await response.blob();
    const filename = 'gymnastics_video.mov';
    // File extends Blob and adds a name — preferred over bare Blob for servers
    // that inspect Content-Disposition. Falls back to blob if File isn't available.
    const file = typeof File !== 'undefined'
      ? new File([blob], filename, { type: blob.type || 'video/quicktime' })
      : blob;
    formData.append('video', file, filename);
  } else {
    // React Native (iOS/Android): FormData accepts a URI descriptor object.
    formData.append('video', {
      uri: videoUri,
      name: 'gymnastics_video.mov',
      type: 'video/quicktime',
    } as any);
  }

  formData.append('skillId', skillId);

  const response = await api.post<AIFeedback>('/api/analyze-video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
