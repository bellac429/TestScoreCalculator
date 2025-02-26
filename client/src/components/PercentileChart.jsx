import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";


const PercentileChart = ( { scores, percentiles, medianPercentile } ) => {

    // Create an array including all percentiles between start and end with data from backend: [start, end]
    const [start, end] = percentiles;
    const percentileArr = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    console.log(percentileArr)

    // Prepare data for the chart
    const data = scores.map((score, index) => ({
        score,
        percentile: percentileArr[index],
    }));

    // Find the median score for the median percentile
    const medianIndex = percentileArr.indexOf(medianPercentile);
    const medianScore = medianIndex !== -1 ? scores[medianIndex] : null;

    return (
        <>
            <h2 className="text-xl font-bold text-center mb-4">Class Reading Test Percentile</h2>
            <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" label={{ value: "Scores", position: "bottom" }} />
                <YAxis label={{ value: "Percentiles", angle: -90, position: "left" }} />
                <Tooltip />
                <Line type="monotone" dataKey="percentile" stroke="#8884d8" dot={{ r: 3 }} />
                {medianScore !== null && (
                <ReferenceDot x={medianScore} y={medianPercentile} r={6} fill="red" stroke="black" />
                )}
            </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default PercentileChart