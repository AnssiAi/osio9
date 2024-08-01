import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { EntryWithoutId } from "../../types";
import DiagnosisCodesInput from "./DiagnosisCodesInput";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
}

const HealthCheckForm = ({ onSubmit, onClose }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [codes, setCodes] = useState<string[]>([]);

  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const type = "HealthCheck";
    if (description && date && specialist && rating) {
      const healthCheckRating: number = parseInt(rating);
      let healthCheckObject: EntryWithoutId = {
        description,
        date,
        specialist,
        type,
        healthCheckRating,
      };
      if (codes.length > 0) {
        const diagnosisCodes: string[] = codes;
        healthCheckObject = {
          ...healthCheckObject,
          diagnosisCodes,
        };
      }
      onSubmit(healthCheckObject);
    }
  };
  return (
    <div>
      <h3>New HealthCheck entry</h3>
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
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="rating-select-label">Rating</InputLabel>
            <Select
              labelId="rating-select-label"
              id="rating-select"
              value={rating}
              label="Age"
              onChange={e => setRating(e.target.value)}
            >
              <MenuItem value={"0"}>Healthy</MenuItem>
              <MenuItem value={"1"}>LowRisk</MenuItem>
              <MenuItem value={"2"}>HighRisk</MenuItem>
              <MenuItem value={"3"}>CriticalRisk</MenuItem>
            </Select>
          </FormControl>
        </div>
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

export default HealthCheckForm;
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
