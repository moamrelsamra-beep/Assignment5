import postModel from "../../DB/models/post.model.js";
import userModel from "../../DB/models/user.model.js";
import commentModel from "../../DB/models/comment.model.js";
import { sequelize } from "../../DB/connectionDB.js";

export const createPost = async (req, res) => {
    try {
        const post = await postModel.create(req.body);
        res.status(201).json({ message: "Post created", post });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await postModel.findByPk(postId);
        
        if (!post || post.userId !== userId) {
            return res.status(500).json({ message: "Unauthorized or not found" });
        }
        await post.destroy();
        res.status(200).json({ message: "Post Deleted Successfully!!!" });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const getPostsDetails = async (req, res) => {
    try {
        const posts = await postModel.findAll({
            attributes: ['id', 'title'],
            include: [
                { model: userModel, attributes: ['id', 'name'] },
                { model: commentModel, attributes: ['id', 'content'] }
            ]
        });
        res.status(200).json({ message: "done", posts });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

export const getPostsCommentCount = async (req, res) => {
    try {
        const posts = await postModel.findAll({
            attributes: [
                'id',
                'title',
                [sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentsCount']
            ],
            include: [{ model: commentModel, attributes: [] }],
            group: ['post.id']
        });
        res.status(200).json({ message: "done", posts });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};