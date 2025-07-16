import { MoreVertical } from "lucide-react";

const MedicineCard = ({ med, onEdit, onDelete, isMenuOpen, toggleMenu }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
      <div className="absolute top-4 right-4">
        <MoreVertical
          className="cursor-pointer text-gray-600 dark:text-gray-300"
          onClick={() => toggleMenu(med.id)}
        />
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-md z-10">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => onEdit(med)}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => onDelete(med.id)}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {med.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mt-2">
        <strong>Total Quantity:</strong> {med.totalQuantity}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Refill Threshold:</strong> {med.refillThreshold}
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
        <strong>Last Updated:</strong>{" "}
        {new Date(med.lastUpdated).toLocaleDateString()}
      </p>
    </div>
  );
};

export default MedicineCard;