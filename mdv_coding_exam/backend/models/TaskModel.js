import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;

const Taskmanagement = db.define('taskmanagements',{
    title: DataTypes.STRING,
    status: DataTypes.STRING,
},{
    freezeTableName:true
});

export default Taskmanagement;

(async()=>{
    await db.sync();
})(); 