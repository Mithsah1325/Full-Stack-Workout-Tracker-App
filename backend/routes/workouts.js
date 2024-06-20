// routes/workout.routes.js

import express from 'express';
import { createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } from '../controllers/workout.controller.js';

const router = express.Router();

// Get all workouts
router.get('/', getAllWorkouts);

// Get a single workout
router.get('/:id', getSingleWorkout);

// Create a new workout
router.post('/', createWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

// Update a workout
router.patch('/:id', updateWorkout);

export default router;
