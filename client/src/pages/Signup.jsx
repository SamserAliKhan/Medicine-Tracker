import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Signup = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  // const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  // Function to handle form submission
  // This function will be called when the form is submitted
  const handleSubmit = async (e) => {
    const uri = `${process.env.REACT_APP_API_BASE_URL}/auth/signup`;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    e.preventDefault(); // Stop form from refreshing the page
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(uri, formData, options);
      if (response.status === 200) {
        alert("User registered successfully!");
        // Optionally redirect or clear form
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          age: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert("Error in registration");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      if (error.response) {
        alert(error.response.data.message || "Something went wrong.");
      } else {
        alert("Cannot reach server.");
      }
    }
    // Handle response or error as needed
    // Later: send POST request to backend here
    console.log("Form submitted:", formData);
  };
  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all duration-300">
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all duration-300">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Signup
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              ></input>
              <input
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              ></input>
              <input
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange(e)}
              ></input>
              <input
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => handleChange(e)}
              ></input>
              <input
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
              ></input>
              <input
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e)}
              ></input>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                type="submit"
              >
                Signup
              </button>
              <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Login here
                </a>
                </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
