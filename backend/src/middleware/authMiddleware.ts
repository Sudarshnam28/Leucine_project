import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      res.status(401).send('Access denied');
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.user = decoded;
      if (!roles.includes(decoded.role)) {
        res.status(403).send('Forbidden');
        return;
      }
      next();
    } catch {
      res.status(400).send('Invalid token');
    }
  };
};