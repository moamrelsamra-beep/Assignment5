import { Router } from "express";
import * as PS from "./post.service.js";
const router = Router();

router.post("/", PS.createPost);
router.delete("/:postId", PS.deletePost);
router.get("/details", PS.getPostsDetails);
router.get("/comment-count", PS.getPostsCommentCount);

export default router;