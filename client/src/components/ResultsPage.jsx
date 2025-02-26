import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from "recharts";
import { DataContext } from "../DataProvider";
import IRRCimg from '../assets/IRRCBrand.jpg'
import EasyCBMSection from './easyCBMSection';

const ResultsPage = () => {
    const { data } = useContext(DataContext)
    const navigate = useNavigate();

    const reset = () => {
        navigate("/")
    }

    return ( 
        <div className="app">
            <div className='results-container'> 
                <header>
                    <img src={IRRCimg} alt='Iowa Reading Research Center Image' height={60} width={300}/>   
                </header>
                <main>
                    <h1 className='hero'>Your classroom's results</h1>
                    {(data) ? (
                        <>
                            <ul className='list roboto-body'>
                                <li>Test: {data.testName}</li>
                                <li >Grade Level: {data.gradeLevel}</li>
                                {data.season && <li>Season: {data.season}</li>}
                            </ul>
                            {data.testName === 'easyCBM' &&
                                <EasyCBMSection data={data} />
                            }

                        </>
                    ) : (
                        <p>No data available</p>
                    )}
                    
                    <button onClick={reset} style={{ marginTop: "3rem" }} >Back</button>
                </main>
            </div>   
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