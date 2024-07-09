import { Patient } from "./types";
import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
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

const getNewID = (): string => {
  const newId: string = uuid();
  return newId;
};

export const toPatient = (object: unknown): Patient => {
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
    const patient: Patient = {
      id: getNewID(),
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation),
    };

    return patient;
  }
  throw new Error("Incorrect data: Missing fields");
};
