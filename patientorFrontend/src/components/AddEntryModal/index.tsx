import { Box, Alert } from "@mui/material";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthForm from "./OccupationalHealthForm";
import { EntryWithoutId } from "../../types";

interface Props {
  toOpen: string;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({ toOpen, onSubmit, error }: Props) => {
  const formToRender = (param: string) => {
    const value: number = parseInt(param);
    switch (value) {
      case 0:
        return <HealthCheckForm onSubmit={onSubmit} />;
      case 1:
        return <HospitalForm onSubmit={onSubmit} />;
      case 2:
        return <OccupationalHealthForm onSubmit={onSubmit} />;
      default:
        return null;
    }
  };
  return (
    <div>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <Box sx={{ border: "1px solid grey", padding: 2 }}>
        {formToRender(toOpen)}
      </Box>
    </div>
  );
};

export default AddEntryModal;
