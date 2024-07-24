import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { NonSensitivePatient, Patient, NewPatient } from "../types";

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
  const newPatient = {
    id: getNewID(),
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getSecurePatients,
  addPatient,
  getPatientById,
};
