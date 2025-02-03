import express from "express";
import multer from "multer";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(cors());

const upload = multer({ dest: "uploads/" });

function calculateMedian(numbers) {
    numbers.sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);
    return numbers.length % 2 !== 0
        ? numbers[mid]
        : (numbers[mid - 1] + numbers[mid]) / 2;
}

app.post("/upload", upload.single("file"), (req, res) => {
    const filePath = req.file.path;
    const extension = req.file.originalname.split(".").pop();

    let scores = [];

    if (extension === "csv") {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                const score = parseFloat(row["Score"]); // Adjust column name if needed
                if (!isNaN(score)) scores.push(score);
            })
            .on("end", () => {
                fs.unlinkSync(filePath);
                res.json({ median: calculateMedian(scores) });
            });
    } else if (extension === "xlsx") {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        scores = data.map((row) => parseFloat(row["Score"])).filter((n) => !isNaN(n));

        fs.unlinkSync(filePath);
        res.json({ median: calculateMedian(scores) });
    } else {
        fs.unlinkSync(filePath);
        res.status(400).json({ error: "Invalid file format" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
