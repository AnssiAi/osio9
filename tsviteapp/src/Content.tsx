import { CoursePart } from "./types";
import Part from "./Part";
const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part partItem={part} />
        </div>
      ))}
    </>
  );
};

export default Content;
