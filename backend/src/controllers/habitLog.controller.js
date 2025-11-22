const habitLogModel = require("../models/habitLog.model");

// 1️⃣ TOGGLE HABIT STATUS (MAIN FUNCTION)

async function toggleHabitStatus(req, res) {
    try {
        const { habitId, date } = req.body;
        const userId = req.user.id;

        // Find existing log for that date
        let habitLog = await habitLogModel.findOne({
            user: userId,
            habit: habitId,
            date: date
        });

        if (habitLog) {
            // Toggle
            habitLog.status = !habitLog.status;
            await habitLog.save();

            return res.status(200).json({
                message: "Habit status toggled successfully",
                habitLog
            });
        }

        // Create new log if none exists
        habitLog = new habitLogModel({
            user: userId,
            habit: habitId,
            date: date,
            status: true
        });

        await habitLog.save();

        return res.status(201).json({
            message: "Habit log created successfully",
            habitLog
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error toggling habit status",
            error: error.message
        });
    }
}


// 2️⃣ GET LOGS BY MONTH (FOR GRID UI)

async function getLogsByMonth(req, res) {
    try {
        const { month, year } = req.query;
        const userId = req.user.id;

        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }

        // Matches YYYY-MM-DD (2025-11-01)
        const dateRegex = new RegExp(`^${year}-${month.padStart(2, "0")}-\\d{2}$`);

        const logs = await habitLogModel.find({
            user: userId,
            date: { $regex: dateRegex }
        });

        return res.status(200).json({ logs });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching monthly logs",
            error: error.message
        });
    }
}


// (FOR STATS + CHARTS)

async function getLogsForHabit(req, res) {
    try {
        const { habitId } = req.params;
        const userId = req.user.id;

        const logs = await habitLogModel.find({
            user: userId,
            habit: habitId
        }).sort({ date: 1 });

        return res.status(200).json({ logs });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching habit logs",
            error: error.message
        });
    }
}



module.exports = {
    toggleHabitStatus,
    getLogsByMonth,
    getLogsForHabit
};
