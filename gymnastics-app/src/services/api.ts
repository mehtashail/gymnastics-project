import axios from 'axios';

// Update this to your backend URL when running locally
// For Expo Go on iOS simulator: http://localhost:3001
// For Expo Go on physical device: http://<your-machine-ip>:3001
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 90000, // 90s for video analysis
});

export { BASE_URL };
