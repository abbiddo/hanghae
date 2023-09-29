import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Hangmans from "./views/Hangmans";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Navigate to="/hangman" />} />
                <Route path="/hangman" element={<Hangmans />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;