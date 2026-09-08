import { Router } from "express";
import * as CS from "./comment.service.js";
const router = Router();

router.post("/", CS.bulkCreateComments);
router.patch("/:commentId", CS.updateComment);
router.post("/find-or-create", CS.findOrCreateComment);
router.get("/newest/:postId", CS.getNewestComments);
router.get("/details/:id", CS.getCommentDetails);

export default router;