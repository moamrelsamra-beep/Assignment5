import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from "../connectionDB.js";

const postModel = sequelize.define("post", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true,
    paranoid: true
});

export default postModel;