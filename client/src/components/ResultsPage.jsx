import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { DataContext } from "../DataProvider";

const ResultsPage = () => {
    const { data } = useContext(DataContext)
    const navigate = useNavigate();

    const reset = () => {
        navigate("/")
    }

    return (
        <div className="app">
            <h1>Results</h1>
            {(data) ? (
                <>
                    <h3>Test: {data.testName}</h3>
                    <h3>Grade Level: {data.gradeLevel}</h3>
                    <h3>Median: {data.median}</h3>
                    <LineChart width={500} height={300} data={data.scores.map((score, index) => ({ index, score }))}>
                        <XAxis dataKey="index" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#8884d8" />
                    </LineChart>
                </>
            ) : (
                <p>No data available</p>
            )}
            
            <button onClick={reset} style={{ marginTop: "3rem" }} >Back</button>
        </div>
    );
};

export default ResultsPage;