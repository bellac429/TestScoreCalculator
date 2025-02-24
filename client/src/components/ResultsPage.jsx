import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from "recharts";
import { DataContext } from "../DataProvider";

const ResultsPage = () => {
    const { data } = useContext(DataContext)
    const navigate = useNavigate();

    const reset = () => {
        navigate("/")
    }

    
    return (
        <div className="app">
            <main className='center'>
                <h1>Results</h1>
                {(data) ? (
                    <>
                        <h3>Test: {data.testName}</h3>
                        <h3>Grade Level: {data.gradeLevel}</h3>
                        {data.testName === 'easyCBM' &&
                            <div>
                                {data.brMedianPercentile && 
                                <div>
                                    <h3>Basic Reading Median Percentile: {data.brMedianPercentile}</h3>
                                    <h4>Class Basic Reading Percentiles Graphed</h4>
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={data.basicReadingScores.map((score, index) => ({ index, score }))}
                                    >
                                        <XAxis dataKey="index">
                                            <Label value="Index" offset={-5} position="insideBottom" />
                                        </XAxis>
                                        <YAxis>
                                            <Label value="Percentiles" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                                        </YAxis>
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                                    
                                    </LineChart>
                                </div>}
                                
                                <br></br>
                                {data.prMedianPercentile && 
                                    <div>
                                        <h3>Proficient Reading Median Percentile: {data.prMedianPercentile}</h3>
                                        <h4>Class Proficient Reading Percentiles Graphed</h4>
                                        <LineChart
                                            width={500}
                                            height={300}
                                            data={data.profReadingScores.map((score, index) => ({ index, score }))}
                                        >
                                            <XAxis dataKey="index">
                                                <Label value="Index" offset={-5} position="insideBottom" />
                                            </XAxis>
                                            <YAxis>
                                                <Label value="Percentiles" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                                            </YAxis>
                                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="score" stroke="#8884d8" />
                                        
                                        </LineChart>
                                    </div>}
                                

                            </div>
                        }

                    </>
                ) : (
                    <p>No data available</p>
                )}
                
                <button onClick={reset} style={{ marginTop: "3rem" }} >Back</button>
            </main>
        </div>
    );
};


/*
                    <LineChart width={500} height={300} data={data.scores.map((score, index) => ({ index, score }))}>
                        <XAxis dataKey="index" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                    </LineChart>
*/
export default ResultsPage;