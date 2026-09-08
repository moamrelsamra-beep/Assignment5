import commentModel from "../../DB/models/comment.model.js";
import userModel from "../../DB/models/user.model.js";
import postModel from "../../DB/models/post.model.js";

export const bulkCreateComments = async (req, res) => {
    try {
        const comments = await commentModel.bulkCreate(req.body);
        res.status(201).json({ message: "Comments created", comments });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;
        const comment = await commentModel.findByPk(commentId);
        
        if (!comment || comment.userId !== userId) {
            return res.status(500).json({ message: "Unauthorized or not found" });
        }
        comment.content = content;
        await comment.save();
        res.status(200).json({ message: "Comment Updated Successfully!!!", comment });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const findOrCreateComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;
        const [comment, created] = await commentModel.findOrCreate({
            where: { postId, userId, content },
            defaults: { postId, userId, content }
        });
        res.status(200).json({ message: "done", comment, created });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentModel.findAll({
            where: { postId },
            order: [['createdAt', 'DESC']],
            limit: 3
        });
        res.status(200).json({ message: "done", comments });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const getCommentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await commentModel.findByPk(id, {
            include: [{ model: userModel }, { model: postModel }]
        });
        res.status(200).json({ message: "done", comment });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};