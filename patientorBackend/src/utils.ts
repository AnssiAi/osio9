import {
  NewPatient,
  Gender,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  Diagnosis,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number" || value instanceof Number;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error("Incorrect or missing value.");
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value)) {
    throw new Error("Incorrect or missing date.");
  }
  return value;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(value => value.toString())
    .includes(param);
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
    throw new Error("Incorrect or missing gender");
  }
  return value;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!isNumber(value)) {
    throw new Error("Incorrect or missing value");
  }
  return value;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if ("date" in object && "criteria" in object) {
    const parsedObject = {
      date: parseString(object.date),
      criteria: parseString(object.criteria),
    };
    return parsedObject;
  }
  throw new Error("Incorrect data: Missing fields");
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }
  if ("startDate" in object && "endDate" in object) {
    const parsedObject = {
      startDate: parseString(object.startDate),
      endDate: parseString(object.endDate),
    };
    return parsedObject;
  }
  throw new Error("Incorrect data: Missing fields");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const entryTable: Entry[] = [];
    const patient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: entryTable,
    };

    return patient;
  }
  throw new Error("Incorrect data: Missing fields");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }
  const codeTable: string[] = parseDiagnosisCodes(object);

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          let entry: EntryWithoutId = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          if (codeTable && codeTable.length > 0) {
            entry = {
              ...entry,
              diagnosisCodes: codeTable,
            };
          }
          return entry;
        }
        break;
      case "Hospital":
        if ("discharge" in object) {
          let entry: EntryWithoutId = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: object.type,
            discharge: parseDischarge(object.discharge),
          };
          if (codeTable && codeTable.length > 0) {
            entry = {
              ...entry,
              diagnosisCodes: codeTable,
            };
          }
          return entry;
        }
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          let entry: EntryWithoutId = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: object.type,
            employerName: parseString(object.employerName),
          };
          if ("sickLeave" in object) {
            entry = {
              ...entry,
              sickLeave: parseSickLeave(object.sickLeave),
            };
          }
          if (codeTable && codeTable.length > 0) {
            entry = {
              ...entry,
              diagnosisCodes: codeTable,
            };
          }
          return entry;
        }
        break;
      default:
        throw new Error("Type not recognized");
    }
  }

  throw new Error("Incorrect data: Missing fields");
};
