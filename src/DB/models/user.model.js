import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from "../connectionDB.js"; //[cite: 15]

const userModel = sequelize.define("user", { //[cite: 15]
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true } //[cite: 15]
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            checkPasswordLength(value) {
                if (value.length <= 6) throw new Error('Password must be > 6 characters');
            }
        }
    },
    role: { 
        type: DataTypes.ENUM('user', 'admin'), 
        defaultValue: 'user' 
    }
}, {
    timestamps: true, //[cite: 15]
    hooks: {
        beforeCreate: (user) => {
            if (user.name && user.name.length <= 2) throw new Error('Name must be > 2 characters');
        }
    }
});

export default userModel; //[cite: 15]

