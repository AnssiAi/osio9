interface inputArgs {
  value1: number;
  value2: number;
}

const parseProcessArgs = (args: string[]): inputArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Arguments were not numbers");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  let result: string = "";

  const heightInM: number = height / 100;
  const heightForCalc: number = heightInM * heightInM;
  const bmi: number = weight / heightForCalc;

  if (bmi <= 18.4) {
    result = "Underweight";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    result = "Normal (healthy weight)";
  }
  if (bmi >= 25) {
    result = "Overweight";
  }

  return result;
};

try {
  const { value1, value2 } = parseProcessArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log("Error:", err.message);
  }
}

export default calculateBmi;
