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
          {patient.entries?.map((entry: Entry) => (
            <ul key={entry.id}>
              <li>{entry.date}</li>
              <li>{entry.description}</li>
              <li>{entry.specialist}</li>
              <li>{entry.type}</li>
            </ul>
          ))}
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};
export default PatientPage;
