import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { EntryWithoutId } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}

const OccupationalHealthForm = ({ onSubmit, onClose }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [codes, setCodes] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");

  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const type = "OccupationalHealthcare";
    if (description && date && specialist && employerName) {
      let occupationalHealthObject: EntryWithoutId = {
        description,
        date,
        specialist,
        type,
        employerName,
      };
      if (sickLeaveStart.length > 0 && sickLeaveEnd.length > 0) {
        const sickLeave = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        };
        occupationalHealthObject = {
          ...occupationalHealthObject,
          sickLeave,
        };
      }
      if (codes.length > 0) {
        const diagnosisCodes: string[] = codes.split(",");
        occupationalHealthObject = {
          ...occupationalHealthObject,
          diagnosisCodes,
        };
      }
      onSubmit(occupationalHealthObject);
    }
  };
  return (
    <div>
      <h3>New OccupationalHealthCare entry</h3>
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
        <div>
          <TextField
            id="standard-required"
            label="Employer"
            variant="standard"
            value={employerName}
            onChange={e => setEmployerName(e.target.value)}
          />
        </div>
        <Box sx={{ border: "1px solid grey", padding: 2 }}>
          <div>
            <TextField
              id="standard-required"
              label="Sickleave start date"
              variant="standard"
              value={sickLeaveStart}
              onChange={e => setSickLeaveStart(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="standard-required"
              label="Sickleave end date"
              variant="standard"
              value={sickLeaveEnd}
              onChange={e => setSickLeaveEnd(e.target.value)}
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

export default OccupationalHealthForm;
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
