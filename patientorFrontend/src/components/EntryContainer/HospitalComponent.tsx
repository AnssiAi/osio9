import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { HospitalEntry } from "../../types";

const HospitalComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <b>Date: {entry.date}</b>
          <p>Description: {entry.description}</p>
          <p>
            Discharge: {entry.discharge.date}, {entry.discharge.criteria}
          </p>
          <p>diagnosed by: {entry.specialist}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HospitalComponent;
