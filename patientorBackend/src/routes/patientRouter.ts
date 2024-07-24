import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getSecurePatients());
});

router.get("/:id", (_req, res) => {
  const found = patientService.getPatientById(_req.params.id);
  if (found) {
    res.send(found);
  } else {
    res.status(400).send("Id not recognized");
  }
});

router.post("/", (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);
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
