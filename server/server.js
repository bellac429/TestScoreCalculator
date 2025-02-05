import express from "express";
import multer from "multer";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import cors from "cors";
import { calculateMedian } from "./utils";

const app = express();
const PORT = 8000;

// Update the CORS options to allow requests from frontend
const corsOptions = {
    origin: ["http://localhost:5173", "localhost:5173"], // Include the frontend URL
  };
app.use(cors(corsOptions));

const upload = multer({ dest: "uploads/" });


app.post("/upload", upload.single("file"), (req, res) => {
    console.log("recieved upload request")
    const filePath = req.file.path;
    const extension = req.file.originalname.split(".").pop();
    console.log("file path: ", filePath, "extension: ", extension)

    let scores = [];

    if (extension === "csv") {
        console.log("inside csv process")
        
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                const score = parseFloat(row["Score"]); // Adjust column name if needed
                if (!isNaN(score)) scores.push(score);
            })
            .on("end", () => {
                fs.unlinkSync(filePath);

                console.log("scores: ", scores)
                const median = calculateMedian(scores)
                console.log("median: ", median)

                res.json({ median: median, scores: scores });
            });

    } else if (extension === "xlsx") {
        console.log("inside xlsx process")
        const workbook = xlsx.readFile(filePath);

        const sheetName = workbook.SheetNames[0];
        console.log("sheet name: ", sheetName)

        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log("data: ", data)

        scores = data.map((row) => parseFloat(row["Score"])).filter((n) => !isNaN(n));
    
        fs.unlinkSync(filePath);

        console.log("scores: ", scores)
        const median = calculateMedian(scores)
        console.log("median: ", median)

        res.json({ median: median, scores: scores });
    } else {
        fs.unlinkSync(filePath);
        res.status(400).json({ error: "Invalid file format" });
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
