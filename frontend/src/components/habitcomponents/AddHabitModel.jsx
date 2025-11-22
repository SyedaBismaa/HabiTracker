// src/components/habit/AddHabitModal.jsx
import React, { useState } from "react";

const AddHabitModal = ({ open = false, onAdd = () => {}, onClose = () => {} }) => {
  const [title, setTitle] = useState("");
//   const [color, setColor] = useState("#06b6d4");

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title: title.trim() });
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-gray-800 p-5 rounded-xl w-80 shadow-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Habit</h3>

        {/* Habit Title */}
        <label className="block text-xl mb-3">Habit Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter habit name..."
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 mb-4 outline-none"
        />

     

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded border border-gray-500 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 rounded bg-green-500  font-semibold hover:bg-green-400"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabitModal;
