import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        <Link to="/">MediTrack</Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
            <Link
              to="/add-medicine"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Add Medicine
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Signup
            </Link>
          </>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-black" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
