import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import Male from "@mui/icons-material/Male";
import Female from "@mui/icons-material/Female";
import Transgender from "@mui/icons-material/Transgender";

import patientService from "../../services/patients";

import { Patient, Entry, Diagnosis } from "../../types";
import EntryContainer from "../EntryContainer/EntryContainer";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
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

  return (
    <div>
      {patient ? (
        <>
          <h3>
            {patient.name} {showGender(patient.gender)}
          </h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
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
