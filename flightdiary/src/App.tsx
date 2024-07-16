import axios from "axios";
import "./styles.css";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string>("");
  const [date, setDate] = useState<string>("");
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

    const entryObject = {
      date: date,
      visibility: visibility,
      weather: weather,
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
    setDate("");
    setVisibility("");
    setWeather("");
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
              type="text"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
          <label>
            Visibility:
            <input
              type="text"
              name="visibility"
              value={visibility}
              onChange={e => setVisibility(e.target.value)}
            />
          </label>
          <label>
            Weather:
            <input
              type="text"
              name="weather"
              value={weather}
              onChange={e => setWeather(e.target.value)}
            />
          </label>
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
