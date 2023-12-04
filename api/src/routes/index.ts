import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import profileRouter from '../serves/profile';

const router = Router();

router.use('/user', middleware.user, (req, res) => res.json(req.user || {}));

router.use('/profile', profileRouter);

export default router;
