import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from "recharts";
import { DataContext } from "../DataProvider";
import IRRCimg from '../assets/IRRCBrand.jpg'

const ResultsPage = () => {
    const { data } = useContext(DataContext)
    const navigate = useNavigate();

    const reset = () => {
        navigate("/")
    }

    return ( 
        <div className="app">
            <div className='container'> 
                <header>
                    <img src={IRRCimg} alt='Iowa Reading Research Center Image' height={72} width={300}/>   
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
                                <div>
                                    {data.brMedianPercentile &&
                                    <section>
                                        <h2 className='roboto-subhead'>Basic Reading</h2>
      
                                            <ul className='roboto-body'> 
                                                <li>Median Score: {data.basicReadingMedian}</li>
                                                <li>Median Percentile: {data.brMedianPercentile}</li>
                                            </ul>

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

                                    </section>}
                                    
                                    <br></br>
                                    {data.prMedianPercentile && 
                                        <div>
                                            <h2 className='roboto-subhead'>Proficient Reading</h2>
                                            <ul className='roboto-body'>
                                                <li>Median Score: {data.profReadingMedian}</li>
                                                <li>Median Percentile: {data.prMedianPercentile}</li>
                                            </ul>
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