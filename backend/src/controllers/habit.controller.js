const habitModel = require("../models/habit.model");

async function createHabit(req, res) {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const newHabit = new habitModel({
            user: userId,
            title: title
        });

        await newHabit.save();
        res.status(200).json({ message: "Habit created successfully", habit: newHabit });

    } catch (err) {
        res.status(500).json({ message: "Error creating habit", error: err.message });
    }
}


async function getHabit(req, res) {
    try {
        const userId = req.user.id;
        const habits = await habitModel.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({ habits });
    } catch (err) {
        res.status(500).json({ message: "Error fetching habits", error: err.message });
    }
}


async function updateHabit(req, res) {
    try {
        const habitId = req.params.id;
        const { title } = req.body;

        const habit = await habitModel.findById(habitId);
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        if (habit.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this habit" });
        }

        habit.title = title;
        const updatedHabit = await habit.save();

        res.status(200).json({ message: "Habit updated successfully", habit: updatedHabit });

    } catch (err) {
        res.status(500).json({ message: "Error updating habit", error: err.message });
    }
}


async function deleteHabit(req, res) {
    try {
        const habitId = req.params.id;

        const habit = await habitModel.findById(habitId);
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        if (habit.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this habit" });
        }

        await habit.deleteOne();

        res.status(200).json({ message: "Habit deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Error deleting habit", error: err.message });
    }
}


module.exports = {
    createHabit,
    updateHabit,
    getHabit,
    deleteHabit
};
