import { BrowserRouter, Routes, Route } from "react-router-dom"

//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import UserProvider from "../../contexts/UserProvider";
import LoginScreen from "../LoginScreen";
import RegistrationScreen from "../RegistrationScreen";
import Habits from "../Habits";

function App() {


    return (
        <main className="container">
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginScreen />} />
                        <Route path="/registration" element={<RegistrationScreen />} />
                        <Route path="/habits" element={<Habits />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </main>
    );
}
export default App;