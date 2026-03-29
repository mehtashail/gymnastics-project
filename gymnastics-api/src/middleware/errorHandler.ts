import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[Error]', err.message);

  // Multer file size error
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({
      error: 'Video file is too large. Please try a shorter clip (under 100MB).',
      code: 'FILE_TOO_LARGE',
    });
    return;
  }

  // File type error
  if (err.message.includes('Only video files')) {
    res.status(415).json({
      error: err.message,
      code: 'INVALID_FILE_TYPE',
    });
    return;
  }

  // Default
  res.status(500).json({
    error: err.message || 'An unexpected error occurred.',
    code: 'INTERNAL_ERROR',
  });
}
