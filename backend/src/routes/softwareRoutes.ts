import express from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { AppDataSource } from '../ormconfig';
import { Software } from '../entities/Software';

const router = express.Router();

router.get('/', async (req, res) => {
  const repo = AppDataSource.getRepository(Software);
  const software = await repo.find();
  res.json(software);
});

router.post('/', verifyToken(['Admin']), (req, res) => {
  (async () => {
    const { name, description, accessLevels } = req.body;
    const repo = AppDataSource.getRepository(Software);
    const software = repo.create({ name, description, accessLevels });
    await repo.save(software);
    res.send('Software created');
  })();
});

export default router;
