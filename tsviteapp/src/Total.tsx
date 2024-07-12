interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <>
      <p>Number of Exercises {props.totalExercises}</p>
    </>
  );
};

export default Total;
