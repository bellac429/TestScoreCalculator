import basicReadingLookup from './lookupTables/easyCBM/basicReading.js'
import profReadingLookup from './lookupTables/easyCBM/profReading.js';
import aReadingLookup from './lookupTables/Fastbridge/aReading.js';
import cbmReadingLookup from './lookupTables/Fastbridge/cbmReading.js';
import earlyReadingLookup from './lookupTables/Fastbridge/earlyReading.js';

// gets the median out of an array of scores
export function getMedian(scores) {
    if (!Array.isArray(scores) || scores.length === 0) {
      return null; // Handle empty or non-array input
    }
  
    const sortedScores = [...scores].sort((a, b) => a - b); // Create a copy and sort numerically
    const middleIndex = Math.floor(sortedScores.length / 2);
  
    if (sortedScores.length % 2 === 0) {
      // Even number of elements, median is the average of the two middle values
      return (sortedScores[middleIndex - 1] + sortedScores[middleIndex]) / 2;
    } else {
      // Odd number of elements, median is the middle value
      return sortedScores[middleIndex];
    }
  }


// Function to retrieve percentile based on grade, score, and season
export function getEasyCBMPercentile(score, grade, season, lookupTable) {
    if (score < 0) return null; // If score is out of range

    const seasonIndex = { fall: 1, winter: 2, spring: 3 }[season.toLowerCase()];
    if (seasonIndex === undefined) {
        throw new Error("Invalid season. Use 'fall', 'winter', or 'spring'.");
    }
    //console.log('season index: ', seasonIndex)

    const gradeTable = lookupTable[grade];

    return gradeTable[score][seasonIndex] ?? null; 
}


// Function to get the range of scale scores from a given test, season, and grade level
export function getEasyCBMPercentileRange(grade, season, lookupTable) {
    const seasonIndex = { fall: 1, winter: 2, spring: 3 }[season.toLowerCase()];
    if (seasonIndex === undefined) {
        throw new Error("Invalid season. Use 'fall', 'winter', or 'spring'.");
    }
    console.log('season index: ', seasonIndex)

    const gradeTable = lookupTable[grade];

    const firstScore = gradeTable[0][seasonIndex]
    const lastScore = gradeTable[gradeTable.length - 1][seasonIndex]

    const range = [firstScore, lastScore]
    console.log("percentile range: ", range)
    return range
}







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

/* Functions ended up not using

// Function to process the sheet data and add percentiles based on lookup tables
export function addEasyCBMPercentiles(sheetData, brLookupTable, prLookupTable, grade, season) {
    return sheetData.map(entry => ({
        ...entry,
        "brPercentile": getEasyCBMPercentile(entry["Basic Reading"], grade, season, brLookupTable),
        "prPercentile": getEasyCBMPercentile(entry["Proficient Reading"], grade, season, prLookupTable)
    }));
}


*/