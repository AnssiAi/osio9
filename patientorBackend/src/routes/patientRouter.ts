import express from "express";
import patientService from "../services/patientService";
import { toPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getSecurePatients());
});

router.post("/", (_req, res) => {
  try {
    const newPatient = toPatient(_req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err: unknown) {
    let errorMessage = "Error: ";
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
