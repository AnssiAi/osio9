import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const id: string | undefined = useParams().id;

  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient(id);
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
        setModalOpen(false);
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
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitEntryHandler}
            error={error}
            onClose={closeModal}
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
