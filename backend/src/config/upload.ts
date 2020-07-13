import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolderDir = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolderDir,
  storage: multer.diskStorage({
    destination: tmpFolderDir,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  }),

}
