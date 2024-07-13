import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "./Pages/HomePage/HomePage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import UserDashboard from "./Pages/Dashboard/user-dashboard/user-dashboard";
import CompanyDashboard from "./Pages/Dashboard/company-dashboard/company-dashboard";
import InstituteDashboard from "./Pages/Dashboard/institute-dashboard/institute-dashboard";
import AdminPage from "./Pages/Dashboard/admin-dashboard/admin-page";
import UpdateUserProfile from "./Components/Dashboard/user-dashboard-components/userProfile/updateUserProfile";
import ConsultDashboard from "./Pages/Dashboard/consultant-dashboard/consultant-dashboard";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />
            <Route path="/company-dashboard" element={<CompanyDashboard/>} />
            <Route path="/institute-dashboard" element={<InstituteDashboard/>} />
            <Route path="/admin-dashboard" element={<AdminPage/>} />
            <Route path="/consultant-dashboard" element={<ConsultDashboard/>} />
            <Route path="updateUserProfile" element={<UpdateUserProfile />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
