// 1. IMPORT AnimatePresence and useLocation
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation, // <-- Import useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // <-- Import AnimatePresence

import Signup from "./pages/Signup";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import AddMedicine from "./pages/AddMedicine.jsx";

// You need a wrapper component to use the hook, because <Router> must be the parent.
function AnimatedRoutes() {
  const location = useLocation(); // <-- 2. Get the location

  return (
    // 3. WRAP your <Routes> with <AnimatePresence>
    //    We use mode="wait" to ensure the old page animates out before the new one animates in.
    <AnimatePresence mode="wait">
      {/* 4. PASS the location and a unique key to <Routes> */}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
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
        <Route
          path="/add-medicine"
          element={
            <PrivateRoute>
              <AddMedicine />
            </PrivateRoute>
          }
        />
        {/* It's good practice to have a 404 page component instead of just navigating */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* We now render the new component that contains the animation logic */}
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
