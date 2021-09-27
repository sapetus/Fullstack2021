import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
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

router.post('/:id/entries', (req, res) => {
  const patientToUpdate = patientService.getPatientById(req.params.id);

  if (patientToUpdate) {
    const parsedEntry = utils.toNewEntry(req.body);
    const newEntry = patientService.addEntry(parsedEntry, patientToUpdate);

    res.json(newEntry);
  } else {
    res.status(400).send(`Patient with id '${req.params.id}' was not found`);
  }
});

export default router;