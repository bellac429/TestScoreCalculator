import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { InputLabel, MenuItem, FormControl, Select, FormHelperText, Button } from "@mui/material"

function App() {
    const [uploaded, setUploaded] = useState(false)

    const [file, setFile] = useState(null);
    const [testType, setTestType] = useState("Fastbridge");
    const [gradeLevel, setGradeLevel] = useState("K");

    const handleFileChange = (event) => setFile(event.target.files[0]);
    const handleTestTypeChange = (event) => setTestType(event.target.value);
    const handleGradeLevelChange = (event) => setGradeLevel(event.target.value);

    const [median, setMedian] = useState(null);
    const [scores, setScores] = useState([]);    

    const handleUpload = async () => {
        setMedian(null)
        setScores([])
        if (!file) return alert("Please select a file.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("testType", testType);
        formData.append("gradeLevel", gradeLevel);

        console.log("form data: ")
        // Display the key/value pairs
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:8000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("response", response)

            setMedian(response.data.median);
            setScores(response.data.scores || []);
            setUploaded(true)
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    if (uploaded === true) {
        return (
            <div className="app">
                <h2>Median: {median}</h2>
                <LineChart width={500} height={300} data={scores.map((score, index) => ({ index, score }))}>
                    <XAxis dataKey="index" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>

                <button onClick={() => setUploaded(false)}>Upload Again</button>
            </div>
        )

    } else if (uploaded === false) {
        return (
            <div className="app">
                <h1 className="hero">Test Score Analyzer</h1>
    
                <div className="form">
                    <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                        <InputLabel id="test-type-label">Test Type</InputLabel>
                        <Select
                            labelId="test-type-label"
                            id="test-type"
                            value={testType}
                            label="Test Type"
                            onChange={handleTestTypeChange}
                        >
                            <MenuItem value={"Fastbridge"}>Fastbridge</MenuItem>
                            <MenuItem value={"DIBELS"}>DIBELS</MenuItem>
                            <MenuItem value={"CBM"}>CBM</MenuItem>
                        </Select>
                        <FormHelperText>Select test type</FormHelperText>
                    </FormControl>
    
                    <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                        <InputLabel id="grade-level-label">Grade Level</InputLabel>
                        <Select
                            labelId="grade-level-label"
                            id="grade-level"
                            value={gradeLevel}
                            label="Grade Level"
                            onChange={handleGradeLevelChange}
                            
                        >
                            <MenuItem value={"K"}>K</MenuItem>
                            <MenuItem value={"1"}>1</MenuItem>
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"3"}>3</MenuItem>
                            <MenuItem value={"4"}>4</MenuItem>
                            <MenuItem value={"5"}>5</MenuItem>
                        </Select>
                        <FormHelperText>Select grade level</FormHelperText>
                    </FormControl>
    
                    <label > Upload CSV or EXCEL file
                        <input type="file" onChange={handleFileChange} style={{ marginLeft: "1em"}}/>
                    </label>
                    
                    <button onClick={handleUpload}>Upload</button>
                </div>
                
            </div>
        );
    }
}

export default App;