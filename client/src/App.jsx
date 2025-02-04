import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { InputLabel, MenuItem, FormControl, Select, FormHelperText, Button } from "@mui/material"

function App() {
    const [file, setFile] = useState(null);
    const [median, setMedian] = useState(null);
    const [scores, setScores] = useState([]);
    const [testType, setTestType] = useState("Fastbridge");
    const [gradeLevel, setGradeLevel] = useState("K");

    const handleFileChange = (event) => setFile(event.target.files[0]);
    const handleTestTypeChange = (event) => setTestType(event.target.value);
    const handleGradeLevelChange = (event) => setGradeLevel(event.target.value);

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("testType", testType);
        formData.append("gradeLevel", gradeLevel);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
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
            
            

            {/* Output Median and Graph*/}
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
        </div>
    );
}

export default App;







{/* <label>
Select Test Type:
<select value={testType} onChange={handleTestTypeChange}>
    <option value="Fastbridge">Fastbridge</option>
    <option value="DIBELS">DIBELS</option>
    <option value="CBM">CBM</option>
</select>
</label>
<label>
Select Grade Level:
<select value={gradeLevel} onChange={handleGradeLevelChange}>
    <option value="K">K</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>
</label>
<br /><br /> */}