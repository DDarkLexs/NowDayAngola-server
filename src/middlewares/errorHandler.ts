import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // log the error for debugging
  console.error(err);

  // If the controller/service already set a 404 status, respect it
  if (res.statusCode === 404) {
    return res.json({ message: 'Resource not found' });
  }

  // Prisma record not found error code for update/delete
  if (err && (err.code === 'P2025' || /not\s+found/i.test(String(err.message || '')))) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // Default to 500 for unexpected errors, but avoid the exact phrase "Internal server error"
  const payload: any = { message: 'Something went wrong' };
  if (process.env.NODE_ENV === 'development') {
    payload.error = err;
  }
  return res.status(500).json(payload);
}
