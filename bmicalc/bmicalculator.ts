const inRange = (low: number, high: number, item: number): boolean => {
  return low <= item && item <= high;
};

const calculateBmi = (height: number, weight: number): string => {
  let result: string = "";

  const heightInM: number = height / 100;
  const heightForCalc: number = heightInM * heightInM;
  const bmi: number = weight / heightForCalc;

  const under: boolean = inRange(0, 18.4, bmi);
  const normal: boolean = inRange(18.5, 24.9, bmi);
  const over: boolean = inRange(25, 40, bmi);

  if (under) {
    result = "Underweight";
  }
  if (normal) {
    result = "Normal (healthy weight)";
  }
  if (over) {
    result = "Overweight";
  }

  return result;
};

console.log(calculateBmi(180, 74));
