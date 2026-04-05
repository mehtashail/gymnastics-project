# Gymnastics Project

A full-stack application for gymnastics guidance with a backend API, mobile app, and Expo-based frontend.

## Project Structure

```
gymnastics-project/
├── gymnastics-api/       # Express.js backend API (TypeScript)
├── gymnastics-app/       # React Native Expo app (main)
├── gymnastics-expo/      # React Native Expo app (alternative)
└── README.md
```

### Components

- **gymnastics-api**: Backend REST API built with Express.js and TypeScript. Handles data processing, integrates with Claude API.
- **gymnastics-app**: Primary React Native mobile application using Expo with routing and native UI components.
- **gymnastics-expo**: Lightweight Expo app alternative.

## Prerequisites

Before getting started, ensure you have:

- **Node.js 18+** ([download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (for version control)

For mobile development:
- **Expo CLI**: `npm install -g expo-cli`
- Anthropic API key ([get one here](https://console.anthropic.com/))

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Install dependencies for all services
npm install --prefix gymnastics-api
npm install --prefix gymnastics-app
npm install --prefix gymnastics-expo
```

### 2. Configure Environment Variables

**API Setup:**
```bash
# Copy the example config
cp gymnastics-api/.env.example gymnastics-api/.env

# Edit and add your Anthropic API key
# nano gymnastics-api/.env
# ANTHROPIC_API_KEY=sk-ant-...
# PORT=3001
```

**App Setup:**
```bash
# Copy the example config
cp gymnastics-app/.env.example gymnastics-app/.env

# For local development on iOS Simulator:
# EXPO_PUBLIC_API_URL=http://localhost:3001

# For physical device, use your machine's IP:
# EXPO_PUBLIC_API_URL=http://<your-machine-ip>:3001
```

## Running the Application

### Option 1: API + App (Recommended Development Setup)

**Terminal 1 - Start the Backend API:**
```bash
cd gymnastics-api
npm run dev
```

The API will start on `http://localhost:3001`

**Terminal 2 - Start the Mobile App:**
```bash
cd gymnastics-app
npm start
```

Scan the QR code with Expo Go app or press:
- `i` for iOS Simulator
- `a` for Android Emulator
- `w` for web preview

### Option 2: Just the Lightweight Expo App

```bash
cd gymnastics-expo
npm start
```

## Available Scripts

### gymnastics-api

- `npm run dev` — Start development server with auto-reload (uses tsx)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run the compiled server (production)

### gymnastics-app

- `npm start` — Start Expo dev server
- `npm run android` — Run on Android Emulator
- `npm run ios` — Run on iOS Simulator
- `npm run web` — Run web preview

### gymnastics-expo

- `npm start` — Start Expo dev server
- `npm run android` — Run on Android Emulator
- `npm run ios` — Run on iOS Simulator
- `npm run web` — Run web preview

## Environment Variables

### gymnastics-api/.env

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3001
```

### gymnastics-app/.env

```
EXPO_PUBLIC_API_URL=http://localhost:3001
```

## Troubleshooting

### "Cannot find module" errors

If you see missing module errors after cloning, reinstall dependencies:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues on Physical Device

If the app can't reach the API on a physical device:

1. Find your machine's IP: `ipconfig getifaddr en0` (macOS) or `ipconfig` (Windows)
2. Update `.env` in gymnastics-app:
   ```
   EXPO_PUBLIC_API_URL=http://192.168.1.x:3001
   ```
3. Ensure your phone is on the same WiFi network

### Port 3001 Already in Use

If you get "Address already in use" error:

```bash
# Find process using port 3001
lsof -i :3001

# Kill the process (replace PID with the actual process ID)
kill -9 <PID>
```

### Expo Go Not Starting

Make sure you have the latest Expo Go app installed from the App Store or Google Play, then:

```bash
npm start
```

And re-scan the QR code.

## Development Workflow

1. Make changes to API or app code
2. Changes auto-reload in dev mode (npm run dev / npm start)
3. Test on simulator or physical device
4. Commit and push when ready:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

## Next Steps

- Set up database (if needed)
- Configure production API endpoint
- Set up CI/CD pipeline
- Deploy API to production
- Build and submit mobile app to app stores

## Support

For issues or questions:
- Check existing code in respective directories
- Review environment variable configuration
- Ensure all dependencies are installed (`npm install`)
