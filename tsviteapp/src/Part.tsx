import { CoursePart, assertNever } from "./types";

const Part = ({ partItem }: { partItem: CoursePart }): JSX.Element => {
  switch (partItem.kind) {
    case "background":
      return (
        <>
          <h3>{partItem.name}</h3>
          <i>{partItem.description}</i>
          <p>Material: {partItem.backgroundMaterial}</p>
          <p>Exercise count: {partItem.exerciseCount}</p>
        </>
      );
    case "basic":
      return (
        <>
          <h3>{partItem.name}</h3>
          <i>{partItem.description}</i>
          <p>Exercise count: {partItem.exerciseCount}</p>
        </>
      );
    case "group":
      return (
        <>
          <h3>{partItem.name}</h3>
          <p>Group project count: {partItem.groupProjectCount}</p>
          <p>Exercise count: {partItem.exerciseCount}</p>
        </>
      );
    case "special":
      return (
        <>
          <h3>{partItem.name}</h3>
          <i>{partItem.description}</i>
          <dl>
            <dt>Requirements:</dt>
            {partItem.requirements.map((item, index) => {
              return <dd key={partItem.name + index}>{item}</dd>;
            })}
          </dl>
          <p>Exercise count: {partItem.exerciseCount}</p>
        </>
      );
    default:
      return assertNever(partItem);
  }
};

export default Part;
