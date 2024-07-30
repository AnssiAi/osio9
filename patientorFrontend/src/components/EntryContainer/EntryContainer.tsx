import { Entry } from "../../types";
import HospitalComponent from "./HospitalComponent";
import HealthCheckComponent from "./HealthCheckComponent";
import OccupationalHealthComponent from "./OccupationalHealthComponent";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryContainer = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryContainer;
