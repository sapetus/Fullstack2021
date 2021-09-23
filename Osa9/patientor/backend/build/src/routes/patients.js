"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = (0, express_1.default)();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        res.status(400);
        if (error instanceof Error) {
            res.send(error.message);
        }
    }
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(400).send(`Patient with id '${req.params.id}' was not found`);
    }
});
exports.default = router;
