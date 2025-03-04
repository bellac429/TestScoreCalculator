import basicReadingLookup from './lookupTables/easyCBM/basicReading.js'
import profReadingLookup from './lookupTables/easyCBM/profReading.js';
import aReadingLookup from './lookupTables/Fastbridge/aReading.js';
import cbmReadingLookup from './lookupTables/Fastbridge/cbmReading.js';
import earlyReadingLookup from './lookupTables/Fastbridge/earlyReading.js';

export function getMedian(scores) {
    if (!scores) {return null}
    // First, sort the array in ascending order
    scores.sort((a, b) => a - b);
    // Find the middle index
    const middleIndex = Math.floor(scores.length / 2);
    // Check if the array length is even or odd
    if (scores.length % 2 === 0) {
        // If even, return the average of the two middle numbers
        return (scores[middleIndex - 1] + scores[middleIndex]) / 2;
    } else {
        // If odd, return the middle number
        return scores[middleIndex];
    }
}

// Function to retrieve percentile based on grade, score, and season
export function getPercentile(testName, score, grade, season, lookupTable) {
    if (score < 0) return null; // If score is out of range

    const seasonIndex = { fall: 1, winter: 2, spring: 3 }[season.toLowerCase()];
    if (seasonIndex === undefined) {
        throw new Error("Invalid season. Use 'fall', 'winter', or 'spring'.");
    }
    console.log('season index: ', seasonIndex)

    const gradeTable = lookupTable[grade];

    if (testName==="easyCBM") {return gradeTable[score][seasonIndex] ?? null; }
    else if (testName==="Fastbridge") {return gradeTable[score-1][seasonIndex] ?? null; } // Fastbridge lookup tables are offset by 1
}
//console.log('aReading cut score: ', getPercentile("Fastbridge", 1, 0, "Fall", aReadingLookup))
//console.log('prof reading percentile', getPercentile("easyCBM", 16, 5, "Winter", profReadingLookup))










// Function to process the sheet data and add percentiles based on lookup tables
export function addCBMPercentiles(sheetData, brLookupTable, prLookupTable, grade, season) {
    return sheetData.map(entry => ({
        ...entry,
        "Basic Reading Percentile": getPercentile(entry["Basic Reading"], grade, season, brLookupTable),
        "Proficient Reading Percentile": getPercentile(entry["Proficient Reading"], entry["Grade"], season, prLookupTable)
    }));
}
// Example usage
// const season = "Fall"; // Change to "Winter" or "Spring" as needed
// const updatedSheetData = addPercentiles(sheetData, basicReadingLookup, season);
// console.log(updatedSheetData);

const lookupTable = `


`;

// const formattedArray = lookupTable.split('\n')
//   .filter(line => line.trim() !== '') // Remove empty lines
//   .map(line => {
//     const parts = line.trim().split(' ');
//     const lastFour = parts.slice(-4).map(Number); // Get last four items as numbers
//     return `        [${lastFour.join(', ')}],`;
//   });

// console.log(formattedArray.join('\n'));

