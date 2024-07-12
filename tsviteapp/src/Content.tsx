interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({
  courseParts,
}: {
  courseParts: CoursePart[];
}): JSX.Element => {
  return (
    <>
      {courseParts.map((part, index) => (
        <div key={index}>
          <p>
            {part.name} {part.exerciseCount}
          </p>
        </div>
      ))}
    </>
  );
};

export default Content;
