import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { EntryWithoutId } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const HealthCheckForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [codes, setCodes] = useState<string>("");

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
        const diagnosisCodes: string[] = codes.split(",");
        healthCheckObject = {
          ...healthCheckObject,
          diagnosisCodes,
        };
      }
      onSubmit(healthCheckObject);
    }
    setDescription("");
    setDate("");
    setSpecialist("");
    setRating("");
    setCodes("");
  };
  return (
    <div>
      <h3>New HealthCheck entry</h3>
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
