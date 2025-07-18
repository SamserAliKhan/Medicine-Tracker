import {useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
const Login = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }
    }, [navigate]);      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const uri = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
        console.log("uri:", uri);
        
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post(uri, formData, options);
            console.log("Login response:", response.data);
            const token = response.data.token;
            if (response.status === 200) {
                setIsLoggedIn(true);
                alert("Login successful!");
                console.log("Token to be stored:", token);
                localStorage.setItem("token", token);
                const storedToken = localStorage.getItem("token");
                console.log("Stored token:", storedToken);
                navigate("/dashboard");
            } else {
                alert("Error in login");
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
            if (error.response) {
                alert(error.response.data.message || "Something went wrong.");
            } else {
                alert("Cannot reach server.");
            }
        }
    };
    return (
        <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>            
        </div>
    );
};
export default Login;