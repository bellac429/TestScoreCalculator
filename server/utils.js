import basicReadingLookup from './lookupTables/easyCBM/basicReading.js'
import profReadingLookup from './lookupTables/easyCBM/profReading.js';

export function calculateMedian(scores) {
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
export function getCBMPercentile(score, grade, season, lookupTable) {
    if (!lookupTable.hasOwnProperty(grade)) return null; // If grade is missing

    const gradeTable = lookupTable[grade];

    if (score < 0 || score >= gradeTable.length) return null; // If score is out of range

    const seasonIndex = { fall: 1, winter: 2, spring: 3 }[season.toLowerCase()];
    return gradeTable[score][seasonIndex] ?? null; // Return percentile or null if not found
}
//console.log('basic reading percentile: ', getPercentile(15, 3, "Fall", basicReadingLookup))
//console.log('prof reading percentile', getPercentile(17, 3, "Winter", profReadingLookup))

// Function to process the sheet data and add percentiles based on lookup tables
export function addCBMPercentiles(sheetData, brLookupTable, prLookupTable, grade, season) {
    return sheetData.map(entry => ({
        ...entry,
        "Basic Reading Percentile": getCBMPercentile(entry["Basic Reading"], grade, season, brLookupTable),
        "Proficient Reading Percentile": getCBMPercentile(entry["Proficient Reading"], entry["Grade"], season, prLookupTable)
    }));
}
// Example usage
// const season = "Fall"; // Change to "Winter" or "Spring" as needed
// const updatedSheetData = addPercentiles(sheetData, basicReadingLookup, season);
// console.log(updatedSheetData);

const lookupTable = `

`;

const formattedArray = lookupTable.split('\n')
  .filter(line => line.trim() !== '') // Remove empty lines
  .map(line => {
    const parts = line.trim().split(' ');
    const lastFour = parts.slice(-4).map(Number); // Get last four items as numbers
    return `        [${lastFour.join(', ')}],`;
  });

console.log(formattedArray.join('\n'));

