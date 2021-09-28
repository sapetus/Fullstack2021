"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newPatient;
};
//check the rest of the parameters!
const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge }) => {
    const parsedType = parseType(type);
    switch (parsedType) {
        case "HealthCheck":
            if (diagnosisCodes) {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                    type: parsedType,
                    healthCheckRating: parseHealthCheckRating(healthCheckRating),
                };
            }
            else {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    type: parsedType,
                    healthCheckRating: parseHealthCheckRating(healthCheckRating),
                };
            }
        case "OccupationalHealthcare":
            if (diagnosisCodes && sickLeave) {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                    type: parsedType,
                    employerName: parseEmployerName(employerName),
                    sickLeave: parseSickLeave(sickLeave)
                };
            }
            else if (diagnosisCodes && !sickLeave) {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                    type: parsedType,
                    employerName: parseEmployerName(employerName),
                };
            }
            else if (sickLeave && !diagnosisCodes) {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    type: parsedType,
                    employerName: parseEmployerName(employerName),
                    sickLeave: parseSickLeave(sickLeave)
                };
            }
            else {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    type: parsedType,
                    employerName: parseEmployerName(employerName),
                };
            }
        case "Hospital":
            if (diagnosisCodes) {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
                    type: parsedType,
                    discharge: parseDischarge(discharge)
                };
            }
            else {
                return {
                    description: parseDescription(description),
                    date: parseDate(date),
                    specialist: parseSpecialist(specialist),
                    type: parsedType,
                    discharge: parseDischarge(discharge)
                };
            }
        default:
            throw new Error('Incorrect entry');
    }
};
const parseDischarge = (discharge) => {
    const asDischarge = discharge;
    if (!(asDischarge === null || asDischarge === void 0 ? void 0 : asDischarge.date) || !(asDischarge === null || asDischarge === void 0 ? void 0 : asDischarge.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    if (!isString(asDischarge === null || asDischarge === void 0 ? void 0 : asDischarge.date) || !isString(asDischarge === null || asDischarge === void 0 ? void 0 : asDischarge.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return asDischarge;
};
const parseSickLeave = (sickLeave) => {
    const asSickLeave = sickLeave;
    if (!(asSickLeave === null || asSickLeave === void 0 ? void 0 : asSickLeave.startDate) || !(asSickLeave === null || asSickLeave === void 0 ? void 0 : asSickLeave.endDate)) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }
    if (!isString(asSickLeave === null || asSickLeave === void 0 ? void 0 : asSickLeave.startDate) || !isString(asSickLeave === null || asSickLeave === void 0 ? void 0 : asSickLeave.endDate)) {
        throw new Error('Incorrect or missing sick leave: ' + sickLeave);
    }
    return asSickLeave;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        //as 0 is falsy, check if it is 0
        if (healthCheckRating === 0) {
            return healthCheckRating;
        }
        throw new Error('Incorrect or missing healthcheck rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
    }
    {
        diagnosisCodes.forEach(code => {
            if (!isString(code)) {
                throw new Error('Code not a string: ' + code);
            }
        });
        return diagnosisCodes;
    }
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }
    return employerName;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseType = (type) => {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    switch (type) {
        case "HealthCheck":
            return type;
        case "OccupationalHealthcare":
            return type;
        case "Hospital":
            return type;
        default:
            throw new Error('Incorrect type: ' + type);
    }
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
exports.default = {
    toNewPatient,
    toNewEntry
};
