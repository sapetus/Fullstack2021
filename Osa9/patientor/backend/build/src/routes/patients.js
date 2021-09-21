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
exports.default = router;
