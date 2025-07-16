import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.9, y: "-50%" },
  visible: { opacity: 1, scale: 1, y: "0" },
  exit: { opacity: 0, scale: 0.9, y: "-50%" },
};

const EditMedicineModal = ({ medicine, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: medicine.name,
    totalQuantity: medicine.totalQuantity,
    refillThreshold: medicine.refillThreshold,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:8080/api/medicines/${medicine.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update medicine");

      const updatedMedicine = await res.json();
      onSave(updatedMedicine); // update UI
      onClose(); // close modal
    } catch (error) {
      console.error("❌ Edit failed:", error);
      alert("Failed to update medicine. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
          variants={modal}
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            Edit Medicine
          </h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <label className="block mb-2">
              Total Quantity:
              <input
                type="number"
                name="totalQuantity"
                value={formData.totalQuantity}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <label className="block mb-4">
              Refill Threshold:
              <input
                type="number"
                name="refillThreshold"
                value={formData.refillThreshold}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded dark:bg-gray-700"
                required
              />
            </label>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditMedicineModal;
