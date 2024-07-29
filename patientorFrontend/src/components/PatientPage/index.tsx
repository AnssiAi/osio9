import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";

import { Patient, Entry } from "../../types";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id: string | undefined = useParams().id;

  useEffect(() => {
    const fetchPatient = async (id: string | undefined) => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient(id);
  }, [id]);

  return (
    <div className="App">
      {patient ? (
        <>
          <h3>
            {patient.name}, {patient.gender}
          </h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
          <h4>entries</h4>
          {patient.entries?.map((entry: Entry) => (
            <div key={entry.id}>
              <p>Date: {entry.date}</p>
              <p>Description: {entry.description}</p>
              {entry.diagnosisCodes ? (
                <ul>
                  {entry.diagnosisCodes.map((code: string, index: number) => (
                    <li key={index + code}>{code}</li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};
export default PatientPage;
