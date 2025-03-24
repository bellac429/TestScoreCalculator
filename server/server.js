//csv import: import Papa from "papaparse";
import express from "express"
import cors from "cors"
import multer from "multer"
import xlsx from "xlsx"
import { getMedian, getEasyCBMPercentile, getEasyCBMPercentileRange} from "./utils.js";
import basicReadingLookup from './lookupTables/easyCBM/basicReading.js'
import profReadingLookup from './lookupTables/easyCBM/profReading.js';
import aReadingLookup from "./lookupTables/Fastbridge/aReading.js";
import cbmReadingLookup from "./lookupTables/Fastbridge/cbmReading.js";
import earlyReadingLookup from "./lookupTables/Fastbridge/earlyReading.js";

const app = express();
const PORT = 8080;

// Enable CORS for frontend at https://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Configure Multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("recieved upload request")
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    let season = ""
    if (req.body.season) { season = req.body.season; console.log("season: ", season)}
    let { gradeLevel, testName } = req.body;
    if (typeof gradeLevel === "string") {
        gradeLevel = Number(gradeLevel);
    }
    
    console.log(`grade: ${gradeLevel}, test name: ${testName}`)


    const fileBuffer = req.file.buffer;
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();

    try {

        if (fileExt === 'xls' || fileExt === 'xlsx') {
            console.log('inside excel process')
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log("sheet data:", JSON.stringify(sheetData, null, 2))

            // Process easyCBM data with lookup tables in project folder
            if (testName === "easyCBM") {
                console.log('inside easyCBM process')
                
                // all grades exept 2nd are included in basic reading and proficient reading percentile tables
                if (gradeLevel > 2) { 
                    const brScoreRange = [0,25];
                    const prScoreRange = [0,20]
                    const brPercentileRange = getEasyCBMPercentileRange(gradeLevel, season, basicReadingLookup)
                    const prPercentileRange = getEasyCBMPercentileRange(gradeLevel, season, profReadingLookup)

                    // get array of basic reading and proficient reading scores
                    let basicReadingScores = sheetData.map(row => row['Basic Reading']).filter(brscore => brscore !== undefined);
                    let profReadingScores = sheetData.map(row => row['Proficient Reading']).filter(prscore => prscore !== undefined);
                    console.log("basic reading scores: ", basicReadingScores, "\n prof reading scores: ", profReadingScores)

                    const basicReadingMedian = getMedian(basicReadingScores)
                    const profReadingMedian = getMedian(profReadingScores)
                    console.log("basic reading median: ", basicReadingMedian, "prof reading median: ", profReadingMedian)

                    // getCBMPercentile(score, grade, season, lookupTable)
                    const brMedianPercentile = getEasyCBMPercentile(Math.round(basicReadingMedian), gradeLevel, season, basicReadingLookup)
                    const prMedianPercentile = getEasyCBMPercentile(Math.round(profReadingMedian), gradeLevel, season, profReadingLookup)
                    console.log("basic reading median perc: ", brMedianPercentile, "\n prof reading median perc: ", prMedianPercentile)

                    // get chart data to be graphed in frontend
                    const brChartData = sheetData.map(item => {
                        const basicReadingScore = item["Basic Reading"]; // Ensure the key exists
                        if (basicReadingScore > 12) {return} 
                        return {
                          User: item.User ?? "Unknown",  // Handle possible missing values
                          brScore: basicReadingScore ?? 0,   // Default to 0 if undefined
                          percentile: getEasyCBMPercentile(Math.round(basicReadingScore), gradeLevel, season, basicReadingLookup) ?? 0
                        };
                    });

                    const prChartData = sheetData.map(item => {
                        const profReadingScore = item["Proficient Reading"]; // Ensure the key exists
                        if (profReadingScore > 20) {return} 
                        return {
                          User: item.User ?? "Unknown",  // Handle possible missing values
                          prScore: profReadingScore ?? 0,   // Default to 0 if undefined
                          percentile: getEasyCBMPercentile(Math.round(profReadingScore), gradeLevel, season, profReadingLookup) ?? 0
                        };
                    });

                    if (brMedianPercentile && prMedianPercentile) {
                        res.json({ testName, gradeLevel, season, basicReadingMedian, profReadingMedian, brMedianPercentile, prMedianPercentile, brScoreRange, prScoreRange, brChartData, prChartData, brPercentileRange, prPercentileRange });
                    } else if (brMedianPercentile && !prMedianPercentile) {
                        res.json({ testName, gradeLevel, season, basicReadingMedian, brMedianPercentile, basicReadingScores, brScoreRange, brChartData, brPercentileRange });
                    } else if (prMedianPercentile && !brMedianPercentile) {
                        res.json({ testName, gradeLevel, season, profReadingMedian, prMedianPercentile, profReadingScores, prScoreRange, prChartData, prPercentileRange });
                    } 

                } else { // if analyzing 2nd grade, don't need to create brChartData
                    const prScoreRange = [0,12]

                    let profReadingScores = sheetData.map(row => row['Proficient Reading']).filter(prscore => prscore !== undefined);
                    const profReadingMedian = getMedian(profReadingScores)
                    //console.log('profReadingMedian: ', profReadingMedian)
                    const prMedianPercentile = getEasyCBMPercentile(Math.round(profReadingMedian), gradeLevel, season, profReadingLookup)
                    
                    const prChartData = sheetData.map(item => {
                        const profReadingScore = item["Proficient Reading"]; // Ensure the key exists
                        if (profReadingScore > 12) {return} 
                        return {
                          User: item.User ?? "Unknown",  // Handle possible missing values
                          prScore: profReadingScore ?? 0,   // Default to 0 if undefined
                          percentile: getEasyCBMPercentile(Math.round(profReadingScore), gradeLevel, season, profReadingLookup) ?? 0
                        };
                    });

                    if (prMedianPercentile) {
                        res.json({ testName, gradeLevel, season, profReadingMedian, prMedianPercentile, profReadingScores, prScoreRange, prChartData });
                    } 
                }


            }

            if (testName === "Fastbridge") {
                // console.log('inside Fastbridge process')
                // const fbPercentiles = [1,99];

                // // if the grade level is kindergarten, get aReading and earlyReading scores for Fastbridge lookup tables
                // if (gradeLevel === 0) {
                //     console.log('inside KG process')
                //     let aReadingScores = sheetData.map(row => row['aReading']).filter(score => score !== undefined); // save aReading scores in an array
                //     let earlyReadingScores = sheetData.map(row => row['earlyReading']).filter(score => score !== undefined); // save earlyReadingScores
                    
                //     const aReadingMedian = getMedian(aReadingScores) // get aReading median score
                //     const earlyReadingMedian = getMedian(earlyReadingScores) // get earlyReading median score
                    
                //     const aReadingMedPercentile = getEasyCBMPercentile(testName, aReadingMedian, gradeLevel, season, aReadingLookup) // get aReading median percentile
                //     const earlyReadingMedPercentile = getEasyCBMPercentile(testName, earlyReadingMedian, gradeLevel, season, earlyReadingLookup) // get earlyReading median percentile
                //     console.log(JSON.stringify({ aReadingScores, earlyReadingScores, aReadingMedian, earlyReadingMedian, aReadingMedPercentile, earlyReadingMedPercentile}))

                //     if (aReadingMedPercentile && earlyReadingMedPercentile) {
                //         res.json({ testName, gradeLevel, season, aReadingScores, earlyReadingScores, aReadingMedian, earlyReadingMedian, aReadingMedPercentile, earlyReadingMedPercentile })
                //     }
                // }
            }

    

        } else {
            console.log('invalid file type')
            return res.status(400).json({ error: 'Invalid file type' });
        }

    } catch (error) {
        console.log('error processing file', error)
        return res.status(500).json({ error: 'Error processing file' });
    }

});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


/*  CSV Proccessing
    if (fileExt === 'csv') {
        const fileContent = fileBuffer.toString('utf8');
        const parsedData = Papa.parse(fileContent, { header: true }).data;
        console.log(parsedData)
        scores = parsedData.map(row => row['Scores']).filter(score => score !== undefined);

*/
