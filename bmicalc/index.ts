import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  let returnObject = {};

  try {
    if (!_req.query.height || !_req.query.weight) {
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
    returnObject = {
      error: err.message,
    };
  }
  res.json(returnObject);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("app is running in port", PORT);
});
