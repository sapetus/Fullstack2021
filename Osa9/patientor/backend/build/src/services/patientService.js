"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatientById = (id) => {
    const matchingPatient = patients.find(patient => patient.id === id);
    return matchingPatient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (entry, patient) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
    getPatientById,
    addEntry
};
