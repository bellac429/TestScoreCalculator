import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [median, setMedian] = useState(null);
  const [scores, setScores] = useState([]);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleUpload = async () => {
      if (!file) return alert("Please select a file.");

      const formData = new FormData();
      formData.append("file", file);

      console.log(formData)

      try {
          const response = await axios.post("http://localhost:8000/upload", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });

          setMedian(response.data.median);
          setScores(response.data.scores || []);
      } catch (error) {
          console.error("Error uploading file:", error);
      }
  };


  return (
    <div className="app">
      <main style={{ textAlign: "center", margin: "20px" }}>
            <h1>Test Score Analyzer</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {median !== null && <h2>Median: {median}</h2>}

            {scores.length > 0 && (
                <LineChart width={500} height={300} data={scores.map((score, index) => ({ index, score }))}>
                    <XAxis dataKey="index" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>
            )}
        </main>
    </div>
  )
}

export default App
