import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;