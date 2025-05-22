import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { role: string; id: number }; // add any other fields your token has
    }
  }
}
