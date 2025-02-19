import Papa from "papaparse";
import express from "express"
import cors from "cors"
import multer from "multer"
import xlsx from "xlsx"
import { calculateMedian } from "./utils";

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
    if (req.body.season) { const {season} = req.body}
    const { gradeLevel, testName } = req.body;

    const fileBuffer = req.file.buffer;
    const fileExt = req.file.originalname.split('.').pop().toLowerCase();
    let scores = [];

    try {
        if (fileExt === 'csv') {
            const fileContent = fileBuffer.toString('utf8');
            const parsedData = Papa.parse(fileContent, { header: true }).data;
            console.log(parsedData)
            scores = parsedData.map(row => row['Scores']).filter(score => score !== undefined);

        } else if (fileExt === 'xls' || fileExt === 'xlsx') {
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log("excel data:", JSON.stringify(sheetData))
            scores = sheetData.map(row => row['Scores']).filter(score => score !== undefined);

        } else {
            return res.status(400).json({ error: 'Invalid file type' });
        }

        // Return data based on metrics
        if (scores) {
            const median = calculateMedian(scores)
            res.json({ scores, median, testName, gradeLevel });
        } else {
            res.status(500).json({ error: 'Error processing file' });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error processing file' });
    }

});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
