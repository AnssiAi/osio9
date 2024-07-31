import { useState } from "react";
import {
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthForm from "./OccupationalHealthForm";
import { EntryWithoutId } from "../../types";

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose, error }: Props) => {
  const [formToOpen, setFormToOpen] = useState<string>("");
  const formToRender = (param: string) => {
    switch (param) {
      case "HealthCheck":
        return <HealthCheckForm onSubmit={onSubmit} onClose={onClose} />;
      case "Hospital":
        return <HospitalForm onSubmit={onSubmit} onClose={onClose} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthForm onSubmit={onSubmit} onClose={onClose} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <Box sx={{ border: "1px solid grey", padding: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="formSelectLbl">Entry</InputLabel>
              <Select
                labelId="formSelectLbl"
                id="formSelect"
                value={formToOpen}
                label="Age"
                onChange={e => setFormToOpen(e.target.value)}
              >
                <MenuItem value={"HealthCheck"}>Healthcheck</MenuItem>
                <MenuItem value={"Hospital"}>Hospital</MenuItem>
                <MenuItem value={"OccupationalHealthcare"}>
                  Occupational health
                </MenuItem>
              </Select>
            </FormControl>
            {formToRender(formToOpen)}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEntryModal;
