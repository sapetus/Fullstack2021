import { NewPatient, NewEntry, Gender, Diagnose, HealthCheckRating } from "./types";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
type EntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, type: unknown, healthCheckRating: unknown, employerName: unknown, sickLeave: unknown, discharge: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
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
const toNewEntry = ({ description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge }: EntryFields): NewEntry => {
  const parsedType = parseType(type);

  switch (parsedType) {
    case "HealthCheck":
      return {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        //might want to check this
        diagnosisCodes: diagnosisCodes as Array<Diagnose['code']>,
        type: parsedType,
        healthCheckRating: healthCheckRating as HealthCheckRating,
      };
    case "OccupationalHealthcare":
      return {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        //might want to check this
        diagnosisCodes: diagnosisCodes as Array<Diagnose['code']>,
        type: parsedType,
        employerName: parseEmployerName(employerName),
        //might want to check this
        sickLeave: sickLeave as {startDate: string, endDate: string}
      };
    case "Hospital":
      return {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        //might want to check this
        diagnosisCodes: diagnosisCodes as Array<Diagnose['code']>,
        type: parsedType,
        //might want to check this
        discharge: discharge as {date: string, criteria: string}
      };
    default:
      throw new Error('Incorrect entry');
  }
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }

  return employerName;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
};

const parseType = (type: unknown): string => {
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

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default {
  toNewPatient,
  toNewEntry
};