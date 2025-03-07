import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { InputLabel, MenuItem, FormControl, Select, FormHelperText, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../DataProvider";
import IRRCimg from '../assets/IRRCBrand.jpg'


const UploadPage = () => {
    const { setData } = useContext(DataContext)
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [test, setTest] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [season, setSeason] = useState("");

    const handleFileChange = (event) => {setFile(event.target.files[0]);};
    const handleTestChange = (event) => {setTest(event.target.value);};
    const handleGradeLevelChange = (event) => {setGradeLevel(event.target.value);}; 
    const handleSeasonChange = (event) => {setSeason(event.target.value);}

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");
        else if (!test || !gradeLevel || !(test && gradeLevel)) return alert("Please select fields.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("testName", test);
        formData.append("gradeLevel", gradeLevel);
        // Season data needs to be included with easyCBM or Fastbridge data
        if (test === "easyCBM" && !season || test === "Fastbridge" && !season ) {
            alert("must select a season")
        } else {
            (season) && formData.append("season", season) // append season data if not null
        }
        
        console.log("form data: ") // Print form data
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("response data", JSON.stringify(response.data, null, 2))
            setData(response.data); // set median and test data for results
            navigate("/results")
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file")
        }
    };

    return (
        <div className="app">
            <div className="upload-container">
                <header>
                    <img src={IRRCimg} alt='Iowa Reading Research Center Image' height={60} width={300}/>   
                </header>
                <h1 className="upload-hero center">Analyze Test Scores</h1>
    
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
                            <MenuItem value="easyCBM">easyCBM</MenuItem>
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
                            <MenuItem value="0">K</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            {test === "Fastbridge" && <MenuItem value="6">6</MenuItem>}
                            {test === "Fastbridge" && <MenuItem value="7">7</MenuItem>}
                            {test === "Fastbridge" && <MenuItem value="8">8</MenuItem>}
                            {test === "Fastbridge" && <MenuItem value="9">9</MenuItem>}
                        </Select>
                        <FormHelperText>Select grade level</FormHelperText>
                    </FormControl>

                    {
                        (test === "Fastbridge" || test === "easyCBM") ? (
                        <FormControl sx={{ m: 1, minWidth: 80 }} fullWidth>
                            <InputLabel id="season-label">Season</InputLabel>
                            <Select
                                labelId="season-label"
                                id="season"
                                value={season}
                                label="Season"
                                onChange={handleSeasonChange}
                                required
                            >
                                <MenuItem value="Fall">Fall</MenuItem>
                                <MenuItem value="Winter">Winter</MenuItem>
                                <MenuItem value="Spring">Spring</MenuItem>
                            </Select>
                            <FormHelperText>Select season</FormHelperText>
                        </FormControl>) : (<></>)
                    }
    
                    <label > Upload an EXCEL file
                        <input type="file" name="inputFile" onChange={handleFileChange} style={{ marginLeft: "1em"}}/>
                    </label>


                    
                    <button onClick={handleUpload}>Upload</button>
                </div> 
            </div>
        </div>
    );
};



export default UploadPage;




/*
                    <article>
                        The upload file should contain the following rows for each test:
                        <hr></hr>
                        <span style={{ fontWeight: "bold" }}>Fastbridge</span>
                        <ul>
                            <li>User</li>
                            <li>A column for each assessment's scores (aReading, CBMreading and earlyReading)</li>
                            <li>Grade (KG-9)</li>
                            <li>Time (Fall, Winter, Spring)</li>
                        </ul>

                        <span style={{ fontWeight: "bold" }}>DIBELS</span>
                        <ul>
                            <li>User</li>
                            <li>Composite Score (Doesn't need an assessment column)</li>
                            <li>Grade (KG-8)</li>
                        </ul>

                        <span style={{ fontWeight: "bold" }}>easyCBM</span>
                        <ul>
                            <li>User</li>
                            <li>A column for each assessment's scores (Basic Reading, Proficient Reading)</li>
                            <li>Grade (2-8)</li>
                            <li>Time (Fall, Winter, Spring)</li>
                        </ul>
                    </article>

*/