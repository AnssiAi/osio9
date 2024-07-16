import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { parseDate, parseVisibility, parseWeather } from "./utils";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaries(response.data);
      });
  }, []);

  const newDiaryHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const entryObject: NewDiaryEntry = {
      date: parseDate(date),
      visibility: parseVisibility(visibility),
      weather: parseWeather(weather),
      comment: comment,
    };

    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", entryObject)
      .then(response => {
        setDiaries(diaries.concat(response.data));
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          setMessage(err.response?.data);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        } else {
          console.log(err);
        }
      });

    setComment("");
  };

  return (
    <>
      <h2>Add new entry</h2>
      {message !== "" ? (
        <div id="message">
          <p>{message}</p>
        </div>
      ) : null}
      <div>
        <form onSubmit={e => newDiaryHandler(e)}>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={date.toISOString().substring(0, 10)}
              onChange={e => setDate(new Date(e.target.value))}
            />
          </label>
          <fieldset>
            <legend>Visibility: </legend>
            <div>
              <input
                type="radio"
                name="visibility"
                value="great"
                onChange={e => setVisibility(e.target.value)}
              />
              <label>Great</label>
            </div>
            <div>
              <input
                type="radio"
                name="visibility"
                value="good"
                onChange={e => setVisibility(e.target.value)}
              />
              <label>Good</label>
            </div>
            <div>
              <input
                type="radio"
                name="visibility"
                value="ok"
                onChange={e => setVisibility(e.target.value)}
              />
              <label>Ok</label>
            </div>
            <div>
              <input
                type="radio"
                name="visibility"
                value="poor"
                onChange={e => setVisibility(e.target.value)}
              />
              <label>Poor</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Weather: </legend>
            <div>
              <input
                type="radio"
                name="weather"
                value="sunny"
                onChange={e => setWeather(e.target.value)}
              />
              <label>Sunny</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="rainy"
                onChange={e => setWeather(e.target.value)}
              />
              <label>Rainy</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="cloudy"
                onChange={e => setWeather(e.target.value)}
              />
              <label>Cloudy</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="stormy"
                onChange={e => setWeather(e.target.value)}
              />
              <label>Stormy</label>
            </div>
            <div>
              <input
                type="radio"
                name="weather"
                value="windy"
                onChange={e => setWeather(e.target.value)}
              />
              <label>Windy</label>
            </div>
          </fieldset>
          <label>
            Comment:
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <h2>Diary entries</h2>
      {diaries.map((diary, index) => (
        <div key={index}>
          <h3>Flight: {diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      ))}
    </>
  );
}

export default App;
