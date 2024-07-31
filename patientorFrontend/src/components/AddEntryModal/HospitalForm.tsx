import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { EntryWithoutId } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}

const HospitalForm = ({ onSubmit, onClose }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [codes, setCodes] = useState<string>("");
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
        const diagnosisCodes: string[] = codes.split(",");
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
        <Box sx={{ border: "1px solid grey", padding: 2 }}>
          <div>
            <TextField
              id="standard-required"
              label="Discharge date"
              variant="standard"
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
