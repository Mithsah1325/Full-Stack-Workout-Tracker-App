import Workout from '../models/workout.model.js';

// Create a new workout
export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        // Create a new workout document in the database
        const workout = await Workout.create({ title, reps, load });
        // Send the created workout as a response with a 201 status code
        res.status(201).json(workout);
    } catch (error) {
        // Send the error message with a 400 status code
        res.status(400).json({ error: error.message });
    }
};

// Get all workouts
export const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single workout by ID
export const getSingleWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a workout
export const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.findByIdAndUpdate(id, { title, reps, load }, { new: true, runValidators: true });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
