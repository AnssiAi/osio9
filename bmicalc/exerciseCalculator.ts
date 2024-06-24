interface dailyExerciseH {
  period: number;
  trainingDays: number;
  target: number;
  avrgTime: number;
  targetReached: boolean;
  rating: number;
  ratingDescription: string;
}

const parseProcessArgsToNumArr = (args: string[]): number[] => {
  if (args.length <= 3) throw Error("not enough arguments");
  const dataArgs: string[] = args.slice(2);

  const result = dataArgs.map((item: string) => {
    if (!isNaN(Number(item))) {
      return Number(item);
    } else {
      throw new Error("Argument was not a number");
    }
  });

  return result;
};

const getRating = (avrg: number, target: number): number => {
  let rating: number = 0;
  const line = target / 2;

  if (avrg >= target) {
    rating = 3;
  }
  if (avrg < target && avrg > line) {
    rating = 2;
  }
  if (avrg <= line) {
    rating = 1;
  }
  return rating;
};

const getDescription = (rating: number): string => {
  let result: string = "";

  switch (rating) {
    case 1:
      result = "you can do better";
      break;
    case 2:
      result = "not too bad but could be better";
      break;
    case 3:
      result = "good job!";
      break;
  }

  return result;
};

const calculateExercises = (data: number[]): dailyExerciseH => {
  const targethDaily: number = data[0];
  const trainingData: number[] = data.slice(1);
  const trainingPeriod: number = trainingData.length;
  const activeDays: number = trainingData.filter(
    (item: number) => item > 0
  ).length;
  const totalHours = trainingData.reduce(
    (acc: number, cur: number) => acc + cur,
    0
  );
  const avrg: number = totalHours / trainingPeriod;
  const rating: number = getRating(avrg, targethDaily);
  const description: string = getDescription(rating);
  const targetReached = avrg >= targethDaily ? true : false;

  return {
    period: trainingPeriod,
    trainingDays: activeDays,
    target: targethDaily,
    avrgTime: avrg,
    targetReached: targetReached,
    rating: rating,
    ratingDescription: description,
  };
};

try {
  const data: number[] = parseProcessArgsToNumArr(process.argv);
  console.log(calculateExercises(data));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log("Error:", err.message);
  }
}
