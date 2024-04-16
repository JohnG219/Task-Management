import express from "express";
import {
    getTaskmanagements, 
    getTaskmanagementById,
    createTaskmanagement,
    updateTaskmanagement,
    deleteTaskmanagement
} from "../controllers/TaskManager.js";

const router = express.Router();

router.get('/taskmanagements', getTaskmanagements);
router.get('/taskmanagements/:id', getTaskmanagementById);
router.post('/taskmanagements', createTaskmanagement);
router.put('/taskmanagements/:id', updateTaskmanagement);
router.delete('/taskmanagements/:id', deleteTaskmanagement);

export default router;