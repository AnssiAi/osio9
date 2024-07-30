import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <b>Date: {entry.date}</b>
          <p>Employer: {entry.employerName}</p>
          <p>Description: {entry.description}</p>
          {entry.sickLeave ? (
            <p>
              Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </p>
          ) : null}
          <p>diagnosed by: {entry.specialist}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OccupationalHealthComponent;
