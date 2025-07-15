import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    totalQuantity: "",
    refillThreshold: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchUser = async () => {
      
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:8080/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:8080/api/medicines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicines(res.data);
      } catch (err) {
        console.error("Error loading medicines:", err);
      }
    };

    fetchMedicines();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setNewMedicine({ ...newMedicine, [e.target.name]: e.target.value });
  };
  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const handleAddMedicine = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      try{
        const res = await axios.post("http://localhost:8080/api/medicines",newMedicine,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicines([...medicines, res.data]);
        setNewMedicine({
          name: "",
          totalQuantity: "",
          refillThreshold: "",
        });
      }catch(err){
        console.error("Error adding medicine:", err);
        alert("Failed to add medicine. Please try again.");
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {user && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name} 👋</h2>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md mt-6">
        <h3 className="text-xl font-bold mt-6">Your Medicines</h3>
        <ul className="mt-2">
          {medicines.map((med) => (
            <li key={med.id} className="border-b py-2">
              <strong>{med.name}</strong> – Qty: {med.totalQuantity}, Refill At:{" "}
              {med.refillThreshold}
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddMedicine} className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Add New Medicine</h4>
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={newMedicine.name}
            onChange={handleInputChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="totalQuantity"
            placeholder="Total Quantity"
            value={newMedicine.totalQuantity}
            onChange={handleInputChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="refillThreshold"
            placeholder="Refill Threshold"
            value={newMedicine.refillThreshold}
            onChange={handleInputChange}
            required
            className="block w-full mb-2 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
