// src/Backend/routes/userRoutes.js
import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Route explanations:
// GET /api/users - Get all users
// GET /api/users/:id - Get a specific user by ID
// POST /api/users - Create a new user
// PUT /api/users/:id - Update a user
// DELETE /api/users/:id - Delete a user

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;