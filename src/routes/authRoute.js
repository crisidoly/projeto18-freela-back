import { Router } from "express";
import { SignIn } from "../controllers/authController.js";
import { signInValidation } from "../middlewares/authMiddleware.js";
import { SignUp } from "../controllers/authController.js";
import { signUpValidation } from "../middlewares/authMiddleware.js";

const router = Router()

router.post("/signin", signInValidation, SignIn)
router.post("/signup", signUpValidation, SignUp)

export default router;