import userModel from './user.model.js';
import postModel from './post.model.js';
import commentModel from './comment.model.js';

export const setupRelations = () => {
    userModel.hasMany(postModel, { foreignKey: 'userId', onDelete: 'CASCADE' });
    postModel.belongsTo(userModel, { foreignKey: 'userId' });

    userModel.hasMany(commentModel, { foreignKey: 'userId', onDelete: 'CASCADE' });
    commentModel.belongsTo(userModel, { foreignKey: 'userId' });

    postModel.hasMany(commentModel, { foreignKey: 'postId', onDelete: 'CASCADE' });
    commentModel.belongsTo(postModel, { foreignKey: 'postId' });
};