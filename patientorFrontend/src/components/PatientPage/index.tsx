import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import SvgIcon from "@mui/material/SvgIcon";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";
import Transgender from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";

import { Patient, Entry, Diagnosis, EntryWithoutId } from "../../types";
import EntryContainer from "../EntryContainer/EntryContainer";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [formToOpen, setFormToOpen] = useState<string>("");

  const id: string | undefined = useParams().id;

  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient(id);
  }, [id]);

  const findDiagnoseName = (code: string): string => {
    const foundDiagnosis = diagnoses.find(dia => dia.code === code);
    let returnValue: string = "";
    if (foundDiagnosis) {
      returnValue = foundDiagnosis.name;
    }
    return returnValue;
  };

  const showGender = (value: string) => {
    switch (value) {
      case "male":
        return (
          <SvgIcon>
            <Male sx={{ fontSize: 24 }} />
          </SvgIcon>
        );
      case "female":
        return (
          <SvgIcon>
            <Female sx={{ fontSize: 24 }} />
          </SvgIcon>
        );
      case "other":
        return (
          <SvgIcon>
            <Transgender sx={{ fontSize: 24 }} />
          </SvgIcon>
        );
    }
  };

  const submitEntryHandler = async (values: EntryWithoutId) => {
    //Send entry to backend
    try {
      if (patient) {
        const entry: Entry = await patientService.createEntry(
          values,
          patient.id
        );

        const newPatient: Patient = {
          ...patient,
          entries: patient.entries?.concat(entry),
        };
        setPatient(newPatient);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      setTimeout(() => {
        setError(undefined);
      }, 3000);
    }
  };

  return (
    <div>
      {patient ? (
        <>
          <h3>
            {patient.name} {showGender(patient.gender)}
          </h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
          <FormControl fullWidth>
            <InputLabel id="formSelectLbl">Entry</InputLabel>
            <Select
              labelId="formSelectLbl"
              id="formSelect"
              value={formToOpen}
              label="Age"
              onChange={e => setFormToOpen(e.target.value)}
            >
              <MenuItem value={0}>Healthcheck</MenuItem>
              <MenuItem value={1}>Hospital</MenuItem>
              <MenuItem value={2}>Occupational health</MenuItem>
            </Select>
          </FormControl>
          <AddEntryModal
            toOpen={formToOpen}
            onSubmit={submitEntryHandler}
            error={error}
          />
          <h4>entries</h4>
          {patient.entries?.map((entry: Entry) => (
            <EntryContainer entry={entry} key={entry.id} />
          ))}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};
export default PatientPage;
