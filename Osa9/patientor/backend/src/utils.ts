import { NewPatient, NewEntry, Gender, HealthCheckRating } from "./types";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
type EntryFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, healthCheckRating: unknown, employerName: unknown, sickLeave?: unknown, discharge: unknown };
type SickLeave = { startDate: string, endDate: string };
type Discharge = { date: string, criteria: string };

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
      if (diagnosisCodes) {
        return {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          type: parsedType,
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        };
      } else {
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
      } else if (diagnosisCodes && !sickLeave) {
        return {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
          type: parsedType,
          employerName: parseEmployerName(employerName),
        };
      } else if (sickLeave && !diagnosisCodes) {
        return {
          description: parseDescription(description),
          date: parseDate(date),
          specialist: parseSpecialist(specialist),
          type: parsedType,
          employerName: parseEmployerName(employerName),
          sickLeave: parseSickLeave(sickLeave)
        };
      } else {
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
      } else {
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

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  const asDischarge = discharge as Discharge;

  if (!asDischarge?.date || !asDischarge?.criteria) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  if (!isString(asDischarge?.date) || !isString(asDischarge?.criteria)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return asDischarge;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } => {
  const asSickLeave = sickLeave as SickLeave;

  if (!asSickLeave?.startDate || !asSickLeave?.endDate) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }

  if (!isString(asSickLeave?.startDate) || !isString(asSickLeave?.endDate)) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }

  return asSickLeave;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    //as 0 is falsy, check if it is 0
    if (healthCheckRating === 0) {
      return healthCheckRating;
    }

    throw new Error('Incorrect or missing healthcheck rating: ' + healthCheckRating);
  }

  return healthCheckRating;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
  } {
    diagnosisCodes.forEach(code => {
      if (!isString(code)) {
        throw new Error('Code not a string: ' + code);
      }
    });
    return diagnosisCodes as Array<string>;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export default {
  toNewPatient,
  toNewEntry
};