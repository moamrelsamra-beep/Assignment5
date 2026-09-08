import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('Assignment5', 'root', 'root', {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql'
}) 

export const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully."); //[cite: 14]
    } catch (error) {
        console.error("Unable to connect to DB", error) //[cite: 14]
    }
}

export const syncDB = async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log("Database has been synchronized successfully."); //[cite: 14]
    } catch (error) {
        console.error("Unable to sync with DB", error) //[cite: 14]
    }
}


