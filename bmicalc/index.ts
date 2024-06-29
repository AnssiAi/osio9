import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  let returnObject = {};

  try {
    if (
      !_req.query.height ||
      isNaN(Number(_req.query.height)) ||
      !_req.query.weight ||
      isNaN(Number(_req.query.weight))
    ) {
      throw new Error("malformatted parameters");
    }
    const height: number = Number(_req.query.height);
    const weight: number = Number(_req.query.weight);
    returnObject = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight),
    };
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    returnObject = {
      error: message,
    };
  }
  res.json(returnObject);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyNumArray = (array: any[]): boolean => {
  let result = true;
  for (let i: number = 0; i < array.length; i++) {
    if (isNaN(Number(array[i]))) {
      result = false;
    }
  }
  return result;
};

app.post("/exercises", (req, res) => {
  let returnObject = {};
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      throw new Error("parameters missing");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isNumArray: boolean = verifyNumArray(daily_exercises);

    if (isNaN(Number(target)) || !isNumArray) {
      throw new Error("malformatted parameters");
    }

    let data: number[] = [Number(target)];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    data = data.concat(daily_exercises);

    returnObject = calculateExercises(data);
  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    returnObject = {
      error: message,
    };
  }

  res.json(returnObject);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("app is running in port", PORT);
});
