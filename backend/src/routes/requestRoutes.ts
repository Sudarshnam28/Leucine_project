import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { AppDataSource } from '../ormconfig';
import { Request as AccessRequest } from '../entities/Request';
import { Software } from '../entities/Software';
import { User } from '../entities/User';

interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

const router = express.Router();

router.post('/', verifyToken(['Employee']), (req: AuthenticatedRequest, res: Response): void => {
  (async () => {
    const { softwareId, accessType, reason } = req.body;
    const software = await AppDataSource.getRepository(Software).findOneBy({ id: softwareId });
    const user = await AppDataSource.getRepository(User).findOneBy({ id: req.user?.id });
    if (!software || !user) return res.status(404).send('Missing data');

    const reqRepo = AppDataSource.getRepository(AccessRequest);
    const newRequest = reqRepo.create({ software, user, accessType, reason, status: 'Pending' });
    await reqRepo.save(newRequest);
    res.send('Request submitted');
  })();
});

router.get('/pending', verifyToken(['Manager']), (req: Request, res: Response): void => {
  (async () => {
    const reqRepo = AppDataSource.getRepository(AccessRequest);
    const requests = await reqRepo.find({
      where: { status: 'Pending' },
      relations: ['user', 'software']
    });
    res.json(requests);
  })();
});

router.patch('/:id', verifyToken(['Manager']), (req: Request, res: Response): void => {
  (async () => {
    const { id } = req.params;
    const { status } = req.body;
    const repo = AppDataSource.getRepository(AccessRequest);
    const request = await repo.findOneBy({ id: parseInt(id) });
    if (!request) return res.status(404).send('Request not found');

    request.status = status;
    await repo.save(request);
    res.send('Request updated');
  })();
});

export default router;
