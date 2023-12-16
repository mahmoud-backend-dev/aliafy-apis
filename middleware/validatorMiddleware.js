import { unlink } from 'fs/promises';
import { validationResult } from 'express-validator';

// Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleWare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            await unlink(req.file.path);
        };
        if (req.files && req.files.image)
            await unlink(req.files.image[0].path);
        if (req.files && req.files.icon)
            await unlink(req.files.icon[0].path);
        if (req.files && req.files.academicIdImage)
            await unlink(req.files.academicIdImage[0].path);
        if (req.files && req.files.paymentReceiptImage)
            await unlink(req.files.paymentReceiptImage[0].path);
        if (req.files && req.files.proveImage)
            await unlink(req.files.proveImage[0].path);
        if (req.files && req.files.bankIdImage)
            await unlink(req.files.bankIdImage[0].path);
        if (req.files) {
            if (Array.isArray(req.files)) {
                await Promise.all(req.files.map(async (file) => {
                    await unlink(file.path);
                }));
            }
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default validatorMiddleWare;