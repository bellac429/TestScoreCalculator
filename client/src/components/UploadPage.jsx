import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { InputLabel, MenuItem, FormControl, Select, FormHelperText, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../DataProvider";


const UploadPage = () => {
    const { setData } = useContext(DataContext)
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [test, setTest] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");

    const handleFileChange = (event) => {setFile(event.target.files[0]); console.log("file changed to ", event.target.files[0])};
    const handleTestChange = (event) => {setTest(event.target.value); console.log("test changed to ", event.target.value)};
    const handleGradeLevelChange = (event) => {setGradeLevel(event.target.value); console.log("grade level changed to ", event.target.value)}; 

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");
        else if (!test || !gradeLevel || !(test && gradeLevel)) return alert("Please select fields.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("testName", test);
        formData.append("gradeLevel", gradeLevel);

        console.log("form data: ") // Print form data
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:8000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("response", response)
            setData(response.data); // set median and test data for results
            navigate("/results")
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file")
        }
    };

    return (
        <div className="app">
                <h1 className="hero">Analyze Test Scores</h1>
    
                <div className="form">
                    <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                        <InputLabel id="test-label">Test</InputLabel>
                        <Select
                            labelId="test-label"
                            id="test"
                            value={test}
                            label="Test"
                            onChange={handleTestChange}
                            required
                        >
                            <MenuItem value="Fastbridge">Fastbridge</MenuItem>
                            <MenuItem value="DIBELS">DIBELS</MenuItem>
                            <MenuItem value="CBM">CBM</MenuItem>
                        </Select>
                        <FormHelperText>Select test</FormHelperText>
                    </FormControl>
    
                    <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                        <InputLabel id="grade-level-label">Grade Level</InputLabel>
                        <Select
                            labelId="grade-level-label"
                            id="grade-level"
                            value={gradeLevel}
                            label="Grade Level"
                            onChange={handleGradeLevelChange}
                            required
                        >
                            <MenuItem value="K">K</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
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
};

export default UploadPage;