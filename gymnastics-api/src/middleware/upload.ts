import multer from 'multer';
import path from 'path';

const ALLOWED_EXTENSIONS = ['.mp4', '.mov', '.avi', '.m4v', '.mkv'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext) || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed (.mp4, .mov, .avi, .m4v, .mkv)'));
    }
  },
});
