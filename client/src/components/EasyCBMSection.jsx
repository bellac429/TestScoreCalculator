import React from "react"
//import PercentileChart from "./percentileChart";
import ScoreDistributionLine from "./ScoreDistributionLine"

const EasyCBMSection = ( {data} ) => {

    return (
        <div className='data-container'>
            {data.brMedianPercentile &&
            <section>
                <h2 className='roboto-subhead'>Basic Reading</h2>

                <ul className='roboto-body'> 
                    <li>Median Score: {data.basicReadingMedian}</li>
                    <li>Median Percentile: {data.brMedianPercentile}</li>
                </ul>

                <ScoreDistributionLine medianScore={data.basicReadingMedian} percentiles={data.brScoreRange}/>

            </section>}
            
            <br></br>
            {data.prMedianPercentile && 
            <section>
                <h2 className='roboto-subhead'>Proficient Reading</h2>
                <ul className='roboto-body'>
                    <li>Median Score: {data.profReadingMedian}</li>
                    <li>Median Percentile: {data.prMedianPercentile}</li>
                </ul>

                <ScoreDistributionLine medianScore={data.profReadingMedian} percentiles={data.prScoreRange}/>

            </section>}
            
        </div>
    )
}

export default EasyCBMSection




/*
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

*/