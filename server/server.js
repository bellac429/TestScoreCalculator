//import Papa from "papaparse";
import express from "express"
import cors from "cors"
import multer from "multer"
import xlsx from "xlsx"
import { getMedian, addCBMPercentiles, getPercentile } from "./utils.js";
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
    const { gradeLevel, testName } = req.body;
    console.log(`grade: ${gradeLevel}, test name; ${testName}`)

    const fileBuffer = req.file.buffer;
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();
    let scores = [];

    try {

        if (fileExt === 'xls' || fileExt === 'xlsx') {
            console.log('inside excel process')
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log("excel data:", JSON.stringify(sheetData))

            // Process easyCBM data with lookup tables in project folder
            if (testName === "easyCBM") {
                console.log('inside easyCBM process')
                const brPercentiles = [0,25];
                let prPercentiles;
                if (gradeLevel === 2) {
                    prPercentiles = [0,12]
                } else { prPercentiles = [0,20] }

                let basicReadingScores = sheetData.map(row => row['Basic Reading']).filter(brscore => brscore !== undefined); // get basic reading scores
                let profReadingScores = sheetData.map(row => row['Proficient Reading']).filter(prscore => prscore !== undefined); // get proficient reading scores
                console.log("basic reading scores: ", basicReadingScores, "\n prof reading scores: ", profReadingScores)

                const basicReadingMedian = getMedian(basicReadingScores)
                const profReadingMedian = getMedian(profReadingScores)

                // getCBMPercentile(score, grade, season, lookupTable)
                const brMedianPercentile = getPercentile(basicReadingMedian, gradeLevel, season, basicReadingLookup)
                const prMedianPercentile = getPercentile(profReadingMedian, gradeLevel, season, profReadingLookup)
                console.log("basic reading median: ", brMedianPercentile, "\n prof reading median: ", prMedianPercentile)

                // add percentiles to sheet data if needed:
                // const updatedSheetData = addCBMPercentiles(sheetData, basicReadingLookup, profReadingLookup, gradeLevel, season);
                // console.log("updated Sheet data: ", JSON.stringify(updatedSheetData))

                if (brMedianPercentile && prMedianPercentile) {
                    res.json({ testName, gradeLevel, season, basicReadingMedian, profReadingMedian, brMedianPercentile, prMedianPercentile, basicReadingScores, profReadingScores, brPercentiles, prPercentiles });
                } else if (brMedianPercentile && !prMedianPercentile) {
                    res.json({ testName, gradeLevel, season, basicReadingMedian, brMedianPercentile, basicReadingScores, brPercentiles });
                } else if (prMedianPercentile && !brMedianPercentile) {
                    res.json({ testName, gradeLevel, season, profReadingMedian, prMedianPercentile, profReadingScores, prPercentiles });
                } 

            }

            if (testName === "Fastbridge") {
                console.log('inside Fastbridge process')
                const fbPercentiles = [1,99];

                // if the grade level is kindergarten, get aReading and earlyReading scores for Fastbridge lookup tables
                if (gradeLevel === 0) {
                    let aReadingScores = sheetData.map(row => row['aReading']).filter(score => score !== undefined); 
                    let earlyReadingScores = sheetData.map(row => row['earlyReading']).filter(score => score !== undefined); 
                    const aReadingMedian = getMedian(aReadingScores)
                    const earlyReadingMedian = getMedian(earlyReadingScores)
                    const aReadingMedPercentile = getPercentile(aReadingMedian, gradeLevel, season, aReadingLookup)
                    const earlyReadingMedPercentile = getPercentile(aReadingMedian, gradeLevel, season, aReadingLookup)
                }
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
