import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400);
    if (error instanceof Error) {
      res.send(error.message);
    }
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(400).send(`Patient with id '${req.params.id}' was not found`);
  }
});

export default router;