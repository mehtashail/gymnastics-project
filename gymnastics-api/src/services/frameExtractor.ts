import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

const FRAME_COUNT = 6;

export interface ExtractedFrames {
  frameDir: string;
  framePaths: string[];
  videoPath: string;
}

export async function extractFrames(videoBuffer: Buffer, originalName: string): Promise<ExtractedFrames> {
  const id = uuidv4();
  const ext = path.extname(originalName) || '.mov';
  const videoPath = path.join(os.tmpdir(), `gyma_${id}${ext}`);
  const frameDir = path.join(os.tmpdir(), `frames_${id}`);

  // Write video buffer to disk
  await fs.promises.writeFile(videoPath, videoBuffer);
  await fs.promises.mkdir(frameDir, { recursive: true });

  // Get video duration first
  const duration = await getVideoDuration(videoPath);

  // Extract FRAME_COUNT evenly-spaced frames
  const interval = duration / (FRAME_COUNT + 1);
  const timestamps = Array.from({ length: FRAME_COUNT }, (_, i) => (i + 1) * interval);

  const framePaths = await Promise.all(
    timestamps.map((ts, i) =>
      extractSingleFrame(videoPath, frameDir, i, ts)
    )
  );

  return { frameDir, framePaths, videoPath };
}

function getVideoDuration(videoPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata.format.duration || 5);
    });
  });
}

function extractSingleFrame(videoPath: string, frameDir: string, index: number, timestamp: number): Promise<string> {
  const outputPath = path.join(frameDir, `frame_${index}.jpg`);
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .seekInput(timestamp)
      .frames(1)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject)
      .run();
  });
}

export async function cleanupFrames(frames: ExtractedFrames): Promise<void> {
  try {
    await fs.promises.rm(frames.frameDir, { recursive: true, force: true });
    await fs.promises.unlink(frames.videoPath);
  } catch {
    // Best-effort cleanup
  }
}
