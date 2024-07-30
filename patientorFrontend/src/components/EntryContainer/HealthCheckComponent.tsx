import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SvgIcon from "@mui/material/SvgIcon";
import MonitorHeart from "@mui/icons-material/MonitorHeart";
import { RatingColors } from "../../types";
import { HealthCheckEntry } from "../../types";

const ratingIcon = (color: string) => {
  return (
    <SvgIcon>
      <MonitorHeart sx={{ color: color, fontSize: 24 }} />
    </SvgIcon>
  );
};

const showHealthRating = (value: number) => {
  switch (value) {
    case 0:
      return ratingIcon(RatingColors.Healthy);
    case 1:
      return ratingIcon(RatingColors.LowRisk);
    case 2:
      return ratingIcon(RatingColors.HighRisk);
    case 3:
      return ratingIcon(RatingColors.CriticalRisk);
  }
};

const HealthCheckComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <b>Date: {entry.date}</b>
          <p>Description: {entry.description}</p>
          {showHealthRating(entry.healthCheckRating)}
          <p>diagnosed by: {entry.specialist}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthCheckComponent;
