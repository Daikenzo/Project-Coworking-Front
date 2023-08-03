import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/public/HomePage";
import CoworkingsPage from "./page/admin/CoworkingsPage";
import CreateCoworkingPage from "./page/admin/CreateCoworkingPage";
import UpdateCoworkingPage from "./page/admin/UpdateCoworkingPage";
import LoginPage from "./page/public/LoginPage";
import DashboardPage from "./page/admin/DashboardPage";
import CoworkingsPagePublic from "./page/public/CoworkingsPagePublic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/coworkings" element={<CoworkingsPage />} />
        <Route path="/admin/coworkings/create" element={<CreateCoworkingPage />} />
        <Route path="/admin/coworkings/:id/update" element={<UpdateCoworkingPage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/coworkings" element={<CoworkingsPagePublic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
