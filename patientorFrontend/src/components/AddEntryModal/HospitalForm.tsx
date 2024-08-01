import { useState } from "react";
import { TextField, Button, Box, InputLabel } from "@mui/material";
import { EntryWithoutId } from "../../types";
import DiagnosisCodesInput from "./DiagnosisCodesInput";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}

const HospitalForm = ({ onSubmit, onClose }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [codes, setCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const type = "Hospital";
    if (
      description &&
      date &&
      specialist &&
      dischargeDate &&
      dischargeCriteria
    ) {
      const discharge = {
        date: dischargeDate,
        criteria: dischargeCriteria,
      };
      let hospitalObject: EntryWithoutId = {
        description,
        date,
        specialist,
        type,
        discharge,
      };
      if (codes.length > 0) {
        const diagnosisCodes: string[] = codes;
        hospitalObject = {
          ...hospitalObject,
          diagnosisCodes,
        };
      }
      onSubmit(hospitalObject);
    }
  };
  return (
    <div>
      <h3>New Hospital entry</h3>
      <form onSubmit={e => addEntry(e)}>
        <div>
          <TextField
            sx={{ m: 1, width: 300 }}
            id="standard-required"
            label="Description"
            variant="standard"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ m: 1, width: 300 }}
            type="date"
            id="dateInput"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ m: 1, width: 300 }}
            id="standard-required"
            label="Specialist"
            variant="standard"
            value={specialist}
            onChange={e => setSpecialist(e.target.value)}
          />
        </div>
        <Box sx={{ border: "1px solid grey", padding: 2 }}>
          <div>
            <InputLabel>Discharge date</InputLabel>
            <TextField
              type="date"
              id="dateInput"
              value={dischargeDate}
              onChange={e => setDischargeDate(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-required"
              label="Discharge criteria"
              variant="standard"
              value={dischargeCriteria}
              onChange={e => setDischargeCriteria(e.target.value)}
            />
          </div>
        </Box>
        <div>
          <DiagnosisCodesInput codes={codes} setCodes={setCodes} />
        </div>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 2, marginBottom: 2 }}
          onClick={() => onClose()}
        >
          Close
        </Button>
        <Button
          variant="contained"
          sx={{ marginTop: 2, marginBottom: 2 }}
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default HospitalForm;
/*
<Button
variant="contained"
color="error"
sx={{ marginTop: 2, marginBottom: 2, marginRight: 2 }}
onClick={() => onClose()}
>
Cancel
</Button>
*/
