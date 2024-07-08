import express from "express";
//import cors from "cors";
import diagnoseRouter from "./routes/diagnoseRouter";
const app = express();

/*
const allowedOrigins = ["http://localhost:5173"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
*/

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
//app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
