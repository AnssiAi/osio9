import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { diagnosisCodes } from "../../types";

interface Props {
  codes: string[];
  setCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

const DiagnosisCodesInput = ({ codes, setCodes }: Props) => {
  const handleChange = (e: SelectChangeEvent<typeof codes>) => {
    const {
      target: { value },
    } = e;
    setCodes(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="diagnosis-multiple-checkbox-label">Codes</InputLabel>
      <Select
        labelId="diagnosis-multiple-checkbox-label"
        id="diagnosis-multiple-checkbox"
        multiple
        value={codes}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={selected => selected.join(", ")}
      >
        {diagnosisCodes.map(diaCode => (
          <MenuItem key={diaCode} value={diaCode}>
            <Checkbox checked={codes.indexOf(diaCode) > -1} />
            <ListItemText primary={diaCode} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodesInput;
