import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const [form, setForm] = useState({
    name: "",
    totalQuantity: "",
    refillThreshold: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add medicine");

      alert("Medicine added successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Add New Medicine
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">
            Medicine Name
          </span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 dark:text-gray-300">
            Total Quantity
          </span>
          <input
            type="number"
            name="totalQuantity"
            value={form.totalQuantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 dark:text-gray-300">
            Refill Threshold
          </span>
          <input
            type="number"
            name="refillThreshold"
            value={form.refillThreshold}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-2"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;
