import { Router } from "express"; //[cite: 12]
import * as US from "./user.service.js"; //[cite: 12]
const router = Router(); //[cite: 12]

router.post("/signup", US.signup);
router.put("/:id", US.updateUser);
router.get("/by-email", US.getUserByEmail);
router.get("/:id", US.getUserById);

export default router; //[cite: 12]