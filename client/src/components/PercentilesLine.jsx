import React from "react";
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, Scatter, Tooltip, ReferenceDot } from "recharts";


const PercentilesLine = ({ medianPercentile, percentiles }) => {
    const [start, end] = percentiles;
    const percentileArr = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    //console.log(percentileArr)

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <ResponsiveContainer width="80%" height={100}>
        <ScatterChart margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
          <XAxis type="number" dataKey="x" domain={percentiles} tick={{ fontSize: 15 }} label={{ value: "Percentile Distribution", position: "insideBottom", offset: -15 }} />
            
          <YAxis type="number" dataKey="y" hide /> {/* Hides the Y-axis as it's not needed */}
          <ReferenceDot x={medianPercentile} y={0} r={6} stroke="blue" strokeWidth={3} fill="blue" />
          <Scatter name="Median" data={[{ x: medianPercentile, y:0, size: 150 }]} fill="blue"/>
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          
         
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentilesLine;

/*

    // Convert percentiles to BubbleChart data format
    const data = percentileArr.map((percentile) => ({
        x: percentile,
        y: 0, // Fixed y-value to keep them on the same horizontal line
        size: percentile === medianPercentile ? 150 : 50, // Larger size for median
    }));


    <Scatter name="Percentiles" data={data} fill="gray" /> // adds other dots
*/