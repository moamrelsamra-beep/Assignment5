import userModel from "../../DB/models/user.model.js"; //[cite: 13]

export const signup = async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(201).json({ message: "User created", user }); //[cite: 13]
    } catch (error) {
        res.status(500).json({ message: error.message, error }); //[cite: 13]
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByPk(id); //[cite: 13]
        if (!user) {
            return res.status(500).json({ message: "User not exist" }); //[cite: 13]
        }
        await userModel.update(req.body, { where: { id }, validate: false });
        res.status(200).json({ message: "User Updated Successfully!!!" }); //[cite: 13]
    } catch (error) {
        res.status(500).json({ message: error.message, error }); //[cite: 13]
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userModel.findOne({ where: { email } });
        res.status(200).json({ message: "done", user }); //[cite: 13]
    } catch (error) {
        res.status(500).json({ message: error.message, error }); //[cite: 13]
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByPk(id, { attributes: { exclude: ['role'] } });
        res.status(200).json({ message: "done", user }); //[cite: 13]
    } catch (error) {
        res.status(500).json({ message: error.message, error }); //[cite: 13]
    }
};