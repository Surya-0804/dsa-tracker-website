import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContributionBoard from "./pages/contibutionboard/ContributionBoard";
import Solution from "./pages/solution/Solution";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Signup from "./pages/auth/Signup";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Dashboard from "./pages/auth/Dashboard";
import Login from "./pages/auth/Login";
import AddNotes from "./components/addnotes/AddNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Leaderboard from "./pages/profile/components/leaderboard/Leaderboard";
import CookieConsentComponent from "./components/Cookies/CookieConsentComponent";
import Loading from "./components/loading/Loading";
import LoadingComponent from "./components/loading/LoadingComponent";
import DonutChart from "./pages/profile/components/donutchart/DonutChart";
import TopicSolved from "./pages/profile/components/topicsolved/TopicSolved";
import ProblemsSolvedTable from "./pages/profile/components/problemssovedtable/ProblemsSolvedTable";
import DeveloperDetails from "./pages/about/components/developerDetails/DeveloperDetails";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import { AuthProvider } from "./AuthContext";
import Nav from "./components/nav/Nav";
import DSAJourney from "./pages/dsajourney/DSAJourney";
import AlgoVisualiser from "./pages/algoVisualiser/home/AlgoVisualiser";
import ComingSoon from "./pages/algoVisualiser/comingSoon/ComingSoon";
function App() {
  return (
    <div className="App">

      <AuthProvider>
        <Router>
          <AuthProvider>
            <Nav />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contribution" element={<ContributionBoard />} />
              <Route path="/addnotes" element={<AddNotes />} />
              <Route path="/stats" element={<Profile />} />
              <Route
                path="/donut"
                element={<DonutChart Easy={20} Medium={30} Hard={40} />}
              />
              <Route path="/topic" element={<TopicSolved />} />
              <Route
                path="/solution"
                element={<Solution problemName={"Kadane's Algorithm"} />}
              />
              <Route path="/problemtable" element={<ProblemsSolvedTable />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/cookie" element={<CookieConsentComponent />} />
              <Route path="/developer" element={<DeveloperDetails />} />
              <Route path="/dsajourney" element={<DSAJourney />} />
              <Route path="/algoVisualiser" element={<AlgoVisualiser />} />
              <Route path="/algoVisualiser/comingSoon" element={<ComingSoon />} />
            </Routes>
          </AuthProvider>
        </Router>
      </AuthProvider>
      <ToastContainer position="top-right" style={{ zIndex: 9999999 }} />
      <CookieConsentComponent />
    </div>
  );
}

export default App;
