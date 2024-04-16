import Taskmanagement from "../models/TaskModel.js";
import { v4 as uuidv4 } from "uuid";

export const getTaskmanagements = async(req, res) =>{
    try {
        const response = await Taskmanagement.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTaskmanagementById = async(req, res) =>{
    try {
        const response = await Taskmanagement.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createTaskmanagement = async (req, res) => {
    try {
        const id = uuidv4();
        const taskData = { id, ...req.body };
        await Taskmanagement.create(taskData);
        
        res.status(201).json({ msg: "Taskmanagement Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTaskmanagement = async(req, res) =>{
    try {
        await Taskmanagement.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Taskmanagement Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteTaskmanagement = async(req, res) =>{
    try {
        await Taskmanagement.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Taskmanagement Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}