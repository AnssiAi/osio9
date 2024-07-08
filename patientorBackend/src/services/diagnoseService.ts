import diagnoseData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoseEntries = (): Diagnosis[] => {
  return diagnoseData;
};

export default {
  getDiagnoseEntries,
};
