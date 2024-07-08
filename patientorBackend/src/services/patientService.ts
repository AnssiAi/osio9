import patientData from "../../data/patients";
import { NonSensitivePatient } from "../types";

const getSecurePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getSecurePatients,
};
