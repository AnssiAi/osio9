interface dailyExerciseH {
  period: number;
  trainingDays: number;
  target: number;
  avrgTime: number;
  targetReached: boolean;
  rating: number;
  ratingDescription: string;
}

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
  const targethDaily: number = 2;
  const trainingPeriod: number = data.length;
  const activeDays: number = data.filter((item: number) => item > 0).length;
  const totalHours = data.reduce((acc: number, cur: number) => acc + cur, 0);
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

const testData = [3, 0, 2, 4.5, 0, 3, 1];

console.log(calculateExercises(testData));
