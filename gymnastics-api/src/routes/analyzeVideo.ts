import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload';
import { extractFrames, cleanupFrames } from '../services/frameExtractor';
import { analyzeWithClaude } from '../services/claudeAnalysis';

export const analyzeVideoRouter = Router();

analyzeVideoRouter.post(
  '/',
  upload.single('video'),
  async (req: Request, res: Response, next: NextFunction) => {
    const frames = { frameDir: '', framePaths: [], videoPath: '' } as any;

    try {
      if (!req.file) {
        res.status(400).json({ error: 'No video file provided', code: 'NO_FILE' });
        return;
      }

      const skillId = (req.body.skillId as string) || 'unknown';

      // Extract frames from the video
      const extractedFrames = await extractFrames(req.file.buffer, req.file.originalname);
      Object.assign(frames, extractedFrames);

      // Analyze with Claude
      const feedback = await analyzeWithClaude(extractedFrames.framePaths, skillId);

      res.json(feedback);
    } catch (error: any) {
      // Pass to error handler
      next(error);
    } finally {
      // Always clean up temp files
      if (frames.videoPath) {
        await cleanupFrames(frames).catch(() => {});
      }
    }
  }
);
