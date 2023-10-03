import { Router } from "express";
import signInRouter from "./authRoute.js";
import signUpRouter from "./authRoute.js";

const router = Router();

router.use(signInRouter)
router.use(signUpRouter)

export default router;