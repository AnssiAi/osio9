import patientData from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

const getSecurePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: Patient): Patient => {
  patientData.push(patient);
  return patient;
};

export default {
  getSecurePatients,
  addPatient,
};
