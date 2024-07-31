import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import SvgIcon from "@mui/material/SvgIcon";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";
import Transgender from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";

import { Patient, Entry, Diagnosis, EntryWithoutId } from "../../types";
import EntryContainer from "../EntryContainer/EntryContainer";
import { Box, Button, TextField } from "@mui/material";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [codes, setCodes] = useState<string>("");

  const id: string | undefined = useParams().id;

  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient(id);
  }, [id]);

  /*
  const findDiagnoseName = (code: string): string => {
    const foundDiagnosis = diagnoses.find(dia => dia.code === code);
    let returnValue: string = "";
    if (foundDiagnosis) {
      returnValue = foundDiagnosis.name;
    }
    return returnValue;
  };
  */

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

  const submitEntryHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let submitObject: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      type: "HealthCheck",
      healthCheckRating: parseInt(rating),
    };
    if (codes !== "") {
      const codeArray: string[] = codes.split(",");
      submitObject = {
        ...submitObject,
        diagnosisCodes: codeArray,
      };
    }
    //Send entry to backend
    try {
      if (patient) {
        const entry: Entry = await patientService.createEntry(
          submitObject,
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
    setDescription("");
    setDate("");
    setSpecialist("");
    setRating("");
    setCodes("");
  };

  const cancelEntryHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setDescription("");
    setDate("");
    setSpecialist("");
    setRating("");
    setCodes("");
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
          {error ? <Alert severity="error">{error}</Alert> : null}
          <Box sx={{ border: "1px solid grey", padding: 2 }}>
            <h3>New HealthCheck entry</h3>
            <form onSubmit={e => submitEntryHandler(e)}>
              <div>
                <TextField
                  id="standard-required"
                  label="Description"
                  variant="standard"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="standard-required"
                  label="Date"
                  variant="standard"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="standard-required"
                  label="Specialist"
                  variant="standard"
                  value={specialist}
                  onChange={e => setSpecialist(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="standard-number"
                  label="Healthcheck rating"
                  variant="standard"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Diagnosis codes"
                  variant="standard"
                  value={codes}
                  onChange={e => setCodes(e.target.value)}
                />
              </div>
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: 2, marginBottom: 2, marginRight: 2 }}
                onClick={e => cancelEntryHandler(e)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ marginTop: 2, marginBottom: 2 }}
                type="submit"
              >
                Add
              </Button>
            </form>
          </Box>
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
