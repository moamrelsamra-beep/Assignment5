import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from "../connectionDB.js";

const commentModel = sequelize.define("comment", {
    content: { type: DataTypes.TEXT, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: true
});

export default commentModel;