import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditMedicineModal from "../components/EditMedicineModal.jsx";
import MedicineCard from "../components/MedicineCard.jsx";
import PageTransition from "../components/PageTransition.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const uri = `${process.env.REACT_APP_API_BASE_URL}/user/me`;
      const option ={
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get(uri, option);
        setUser(res.data);
        console.log("👤 User fetched:", res.data);
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

  // Fetch medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      const uri = `${process.env.REACT_APP_API_BASE_URL}/medicines`;
      const option = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get(uri, option);
        setMedicines(res.data);
        console.log("💊 Medicines fetched:", res.data);
      } catch (err) {
        console.error("Error loading medicines:", err);
      }
    };

    fetchMedicines();
  }, [navigate]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (med) => {
    setSelectedMedicine(med);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const uri = `${process.env.REACT_APP_API_BASE_URL}/medicines/${id}`;
    const token = localStorage.getItem("token");
    const confirm = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirm) return;

    try {
      
      if (!token) return navigate("/login");
      const res = await axios.delete(uri, options);
      console.log("Medicine deleted:", res.data);
      setMedicines((prev) => prev.filter((med) => med.id !== id));
      alert("Medicine deleted successfully");
    } catch (err) {
      console.error("Failed deleting medicine:", err);
      alert("Failed to delete medicine: " + (err.response?.data || err.message));
    }
  };

  const handleEditSuccess = (updated) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    setEditModalOpen(false);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-6">
      {/* Welcome Banner */}
      <div className="text-center py-6 bg-blue-50 dark:bg-gray-900 shadow-lg rounded-xl mx-4 mt-4">
        <h1 className="text-3xl font-semibold text-blue-700 dark:text-blue-300">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Keep track of your medicines and stay healthy 💊
        </p>
      </div>

      {/* Medicine Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 mt-4">
        {medicines.map((med) => (
          <MedicineCard
            key={med.id}
            med={med}
            onEdit={handleEdit}
            onDelete={handleDelete}
            toggleMenu={toggleMenu}
            isMenuOpen={openMenuId === med.id}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editModalOpen && selectedMedicine && (
        <EditMedicineModal
          medicine={selectedMedicine}
          onClose={() => setEditModalOpen(false)}
          onSave={handleEditSuccess}
        />
      )}
    </div>
    </PageTransition>
  );
};

export default Dashboard;
