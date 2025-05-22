import { Router, Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const router = Router();

// Signup with OTP generation
router.post('/signup',  (req: Request, res: Response): void => {
  (async () => {
  try {
    const { username, password, email, name, place, role } = req.body;
    const repo = AppDataSource.getRepository(User);

    const existing = await repo.findOneBy({ username });
    if (existing) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = repo.create({
      username,
      password: hashed,
      email,
      name,
      place,
      role,
      otp,
      isVerified: false
    });

    await repo.save(user);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP is: ${otp}`
    });

    return res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});
});
// Verify OTP
router.post('/verify-otp', (req: Request, res: Response): void => {
  (async () => {
  try {
    const { email, otp } = req.body;
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await repo.save(user);

    return res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    console.error('OTP verification error:', err);
    return res.status(500).json({ success: false, message: 'Server error during verification' });
  }
});
});
 router.post('/login', (req: Request, res: Response): void => {
  (async () => {
    const { username, password } = req.body;
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ username });
    if (!user) return res.status(404).send('No user');
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email before login" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Wrong password');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!);
    if (!token) {
  res.status(401).send('Access denied');
  return;
}

    res.json({ token, role: user.role });
  })();
});
export default router;
