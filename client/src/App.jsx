import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from "./components/UploadPage";
import ResultsPage from "./components/ResultsPage";
import { DataProvider } from "./DataProvider";

function App() {
    return (

        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UploadPage />} />
                    <Route path="results" element={<ResultsPage />} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
        
    )
}

export default App;