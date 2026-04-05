# Gymnastics App

Main React Native mobile application for the Gymnastics Guide platform. Built with Expo, React Native, and TypeScript.

## Purpose

The Gymnastics App enables users to:
- **Browse Skills**: Explore gymnastics skills organized by apparatus (beam, vault, bars, floor)
- **Difficulty Levels**: Filter skills by difficulty ratings
- **Video Analysis**: Upload or record gymnastics videos for AI-powered analysis and feedback
- **Instant Feedback**: Get real-time feedback on gymnastics movements using Claude AI
- **Cross-Platform**: Runs on iOS, Android, and web

## Technology Stack

- **Runtime**: React Native 0.81.5 with Expo 54.0
- **Language**: TypeScript 5.9
- **Navigation**: Expo Router (file-based routing)
- **UI Framework**: React Native Paper (Material Design)
- **Animations**: React Native Reanimated
- **State Management**: React Hooks
- **HTTP Client**: axios
- **Icons**: Expo Vector Icons
- **Video**: Expo AV, Expo Image Picker

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Running gymnastics-api backend (see ../gymnastics-api/README.md)
- Expo Go app on your phone (for testing on physical device)
  - iOS: App Store
  - Android: Google Play Store

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example config
cp .env.example .env

# Edit to set the API URL
# nano .env
```

Your `.env` file should contain:

**For iOS Simulator or Android Emulator:**
```
EXPO_PUBLIC_API_URL=http://localhost:3001
```

**For Physical Device on Same WiFi:**
```
EXPO_PUBLIC_API_URL=http://192.168.1.X:3001
```
Replace `192.168.1.X` with your machine's IP address.

To find your IP:
```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I

# Windows
ipconfig
```

## Running

### Start Expo Dev Server

```bash
npm start
```

This launches the Expo dev server and shows a QR code.

### Run on iOS Simulator

```bash
npm run ios
```

Or in the terminal after `npm start`, press `i`.

### Run on Android Emulator

```bash
npm run android
```

Or in the terminal after `npm start`, press `a`.

### Run on Physical Device

1. Start the server: `npm start`
2. Install Expo Go app on your phone (App Store or Google Play)
3. Scan the QR code with your phone's camera or Expo Go app
4. App opens on your device

### Run on Web

```bash
npm run web
```

Or in the terminal after `npm start`, press `w`.

## Project Structure

```
gymnastics-app/
├── app/                       # Expo Router pages (file-based routing)
│   ├── _layout.tsx           # Root layout/navigation setup
│   ├── index.tsx             # Home/main screen
│   └── ...                   # Other screens
├── src/
│   ├── components/
│   │   ├── SkillCard.tsx     # Reusable skill display card
│   │   ├── ApparatusCard.tsx # Apparatus selector
│   │   ├── DifficultyBadge.tsx # Difficulty rating badge
│   │   └── FilterChips.tsx   # Filter UI components
│   ├── services/
│   │   ├── api.ts            # Axios configuration & API calls
│   │   └── videoAnalysis.ts  # Video analysis service
│   ├── hooks/
│   │   ├── useSkills.ts      # Skill data hook
│   │   ├── useVideoAnalysis.ts # Video analysis logic
│   │   └── useDebounce.ts    # Debounce utility hook
│   ├── constants/
│   │   ├── colors.ts         # Color palette
│   │   ├── apparatus.ts      # Apparatus definitions
│   │   └── theme.ts          # Theme configuration
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── data/
│       └── index.ts          # Static skill data
├── assets/                   # Icons, images, splash screens
├── .env                      # Environment variables (git-ignored)
├── .env.example              # Example environment template
├── app.json                  # Expo configuration
├── package.json
├── tsconfig.json
├── babel.config.js
└── README.md
```

## Key Features

### Skill Browsing
- Browse gymnastics skills organized by apparatus
- Filter by difficulty level (beginner to advanced)
- View skill descriptions and requirements

### Video Analysis
- **Upload Video**: Select existing video from device
- **Record Video**: Capture new video in the app
- **AI Analysis**: Send to backend for Claude AI analysis
- **Real-time Feedback**: Receive detailed movement analysis and tips

### User Interface
- Material Design with React Native Paper
- Smooth animations with Reanimated
- File-based routing with Expo Router
- Cross-platform responsive design

## API Integration

The app communicates with the gymnastics-api backend:

```
API_BASE_URL = EXPO_PUBLIC_API_URL

GET /api/health                 # Health check
POST /api/analyze-video         # Video analysis
```

Example API call from the app:
```typescript
const response = await axios.post(
  `${API_BASE_URL}/api/analyze-video`,
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
);
```

## Development Workflow

1. Ensure the API is running: `npm run dev` in gymnastics-api/
2. Start the app: `npm start` in gymnastics-app/
3. Open simulator or scan QR code on physical device
4. Make changes to code—Expo will hot-reload
5. When ready, commit and push:
   ```bash
   git add .
   git commit -m "App: description of changes"
   git push
   ```

## Troubleshooting

### "API connection refused"

The app can't reach the backend API. Check:

1. **API is running**: Start the API with `npm run dev` in gymnastics-api/
2. **Correct URL**: Check your `.env` file has the correct `EXPO_PUBLIC_API_URL`
3. **Network**: On physical device, ensure phone and computer are on same WiFi
4. **Firewall**: Your firewall might be blocking port 3001

### "Camera/Photo permissions denied"

The app needs access to camera and photo library. Check:

1. **iOS**: Settings → Gymnastics Guide → Allow Camera/Photos
2. **Android**: Settings → Apps → Gymnastics Guide → Permissions → Camera/Storage

### "Blank white screen"

1. Clear cache and restart:
   ```bash
   npm start -- --clear
   ```
2. Rebuild Expo Go app cache on device:
   - Close and reopen Expo Go
   - Scan QR code again

### "Module not found" errors

Reinstall dependencies:

```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### "TypeError: Cannot read property of undefined"

Check that:
1. The API is running and returns data
2. `.env` file exists with correct API URL
3. Network request actually succeeds (check console logs)

## Performance Tips

- Video files should be under 50MB for smooth processing
- Limit concurrent video uploads
- Cache skill data locally to reduce API calls
- Use `useDebounce` hook for filter operations

## Security Considerations

- Never hardcode API URLs or sensitive data
- Use `.env` files for configuration
- Validate user input before sending to API
- Request only necessary permissions
- Use HTTPS in production

## Dependencies

### Core
- **react-native**: Mobile app framework
- **expo**: Development and deployment platform
- **expo-router**: File-based routing

### UI/UX
- **react-native-paper**: Material Design components
- **react-native-reanimated**: Animations
- **@expo/vector-icons**: Icon library

### HTTP & Video
- **axios**: HTTP client
- **expo-av**: Audio/video playback
- **expo-image-picker**: Photo/video selection

### Development
- **typescript**: Type safety
- **@types/react**: Type definitions

## Next Steps

- Add user authentication/accounts
- Implement result history/storage
- Add practice routines and tutorials
- Push notifications for achievements
- Analytics and usage tracking
- Build and submit to App Stores (iOS & Android)

## Support

For app issues:
- Check that gymnastics-api is running
- Verify `.env` configuration
- Review console output for error messages
- Check Expo logs: `expo start` shows detailed error info
- Clear Expo cache if experiencing strange behavior
