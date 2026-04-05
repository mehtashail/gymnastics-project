# Gymnastics API

Backend REST API service for the Gymnastics Guide application. Built with Express.js and TypeScript.

## Purpose

The Gymnastics API provides:
- **Video Analysis**: Accepts gymnastics videos and extracts frames for analysis
- **Frame Processing**: Extracts individual frames from uploaded videos using ffmpeg
- **Claude AI Integration**: Uses Anthropic's Claude API to analyze gymnastics movements and provide feedback
- **Health Checks**: Status monitoring endpoints

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.21
- **Language**: TypeScript 5.6
- **Video Processing**: fluent-ffmpeg, sharp
- **AI**: Anthropic Claude API
- **Media Upload**: multer
- **Security**: helmet, cors
- **Development**: tsx (TypeScript runner), tsx watch for hot reload

## Prerequisites

- Node.js 18+
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/))
- ffmpeg (for video frame extraction)

### Install ffmpeg

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt-get install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use:
```bash
choco install ffmpeg
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example config
cp .env.example .env

# Edit and add your Anthropic API key
# nano .env
```

Your `.env` file should contain:
```
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
PORT=3001
```

## Running

### Development Mode (with auto-reload)

```bash
npm run dev
```

This starts the server with hot-reloading enabled. Any changes to `.ts` files will automatically restart the server.

Server will be available at: `http://localhost:3001`

### Production Mode

```bash
# Compile TypeScript to JavaScript
npm run build

# Run the compiled code
npm start
```

## API Endpoints

### Health Check

```
GET /api/health
```

Returns server status. Use this to verify the API is running.

### Video Analysis

```
POST /api/analyze-video
Content-Type: multipart/form-data

Body:
- file: <video file> (required)
```

Uploads a gymnastics video, extracts frames, and uses Claude AI to analyze the movements.

**Response:**
```json
{
  "analysis": "Detailed feedback about the gymnastics movements",
  "frames": ["..."],
  "metadata": {}
}
```

## Project Structure

```
gymnastics-api/
├── src/
│   ├── server.ts              # Entry point, starts Express server
│   ├── app.ts                 # Express app configuration
│   ├── routes/
│   │   ├── health.ts          # Health check endpoint
│   │   └── analyzeVideo.ts    # Video analysis endpoint
│   ├── services/
│   │   ├── frameExtractor.ts  # Extracts frames from videos
│   │   └── claudeAnalysis.ts  # Claude API integration
│   └── middleware/
│       ├── upload.ts          # File upload handling
│       └── errorHandler.ts    # Error handling middleware
├── dist/                      # Compiled JavaScript (generated)
├── .env                       # Environment variables (git-ignored)
├── .env.example               # Example environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Key Dependencies

- **express**: Web framework
- **@anthropic-ai/sdk**: Claude API client
- **fluent-ffmpeg**: Video frame extraction
- **sharp**: Image processing
- **multer**: File upload handling
- **helmet**: Security headers
- **cors**: Cross-origin request handling
- **uuid**: Unique ID generation

## Development Workflow

1. Make changes to TypeScript files in `src/`
2. Changes auto-reload with `npm run dev`
3. Test endpoints using curl, Postman, or the mobile app
4. When ready, commit and push:
   ```bash
   git add .
   git commit -m "API: description of changes"
   git push
   ```

## Troubleshooting

### "ffmpeg not found"

The system can't locate ffmpeg. Make sure it's installed:

```bash
# Check if installed
ffmpeg -version

# If not, install it (see Prerequisites section above)
```

### "ANTHROPIC_API_KEY is required"

Your `.env` file is missing the API key or wasn't loaded. Check:

1. `.env` file exists in the project root
2. It contains `ANTHROPIC_API_KEY=sk-ant-...`
3. Restart the server after creating/updating `.env`

### "EADDRINUSE: address already in use :::3001"

Port 3001 is already in use. Either:

```bash
# Kill the process using port 3001
lsof -i :3001        # Find the PID
kill -9 <PID>

# Or use a different port
PORT=3002 npm run dev
```

### TypeScript Compilation Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Performance Considerations

- Large video files may take time to process
- Frame extraction creates temporary images—ensure sufficient disk space
- Claude API calls are rate-limited; monitor usage

## Security

- Helmet middleware adds security headers
- CORS is configured (adjust in app.ts if needed)
- File uploads are validated with multer
- Never commit `.env` with real API keys

## Next Steps

- Add authentication/authorization
- Implement request rate limiting
- Set up database for storing analysis results
- Add video processing queue (for large files)
- Deploy to cloud (AWS, Heroku, DigitalOcean, etc.)

## Support

For API issues:
- Check that ffmpeg is installed
- Verify Anthropic API key is valid
- Check server logs for detailed error messages
- Ensure database/external services are running (if added)
