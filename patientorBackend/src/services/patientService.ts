import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";

const getSecurePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const foundPatient: Patient | undefined = patientData.find(
    patient => patient.id === id
  );
  return foundPatient;
};

const getNewID = (): string => {
  const newId: string = uuid();
  return newId;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: getNewID(),
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
  const newEntry: Entry = {
    id: getNewID(),
    ...entry,
  };
  const foundPatient = getPatientById(id);
  if (foundPatient) {
    const updatedPatient: Patient = {
      ...foundPatient,
      entries: foundPatient.entries.concat(newEntry),
    };
    const foundIndex = patientData.findIndex(
      (patient: Patient) => patient.id === foundPatient.id
    );
    patientData[foundIndex] = {
      ...updatedPatient,
    };
    return newEntry;
  }
  throw new Error("Patient not found");
};

export default {
  getSecurePatients,
  addPatient,
  getPatientById,
  addEntry,
};
