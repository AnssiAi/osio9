import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaries(response.data);
      });
  }, []);

  return (
    <>
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
