import {BrowserRouter, Route, Routes} from "react-router-dom";
import UserProfile from "./components/UserProfile";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="profile" element={<UserProfile />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}