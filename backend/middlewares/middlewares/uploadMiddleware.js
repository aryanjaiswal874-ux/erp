import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf|doc|docx|csv|xlsx|mp3|wav|ogg|m4a|mp4|webm/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check common mimetypes
    const allowedMimeTypes = [
        'image/jpeg', 'image/png', 'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/x-m4a',
        'video/mp4', 'video/webm'
    ];
    const mimetype = allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith('audio/') || file.mimetype.startsWith('video/');

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        if (extname) return cb(null, true); // Allow if extension matches even if mimetype is weird
        cb(new Error("File type not supported! Supported: Images, PDFs, Office Docs, Audio, Video."));
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
