import { Router } from "express";
import signInRouter from "./authRoute.js";
import signUpRouter from "./authRoute.js";
import catsRouter from "./catsRoute.js";

const router = Router();

router.use(signInRouter)
router.use(signUpRouter)
router.use(catsRouter)

export default router;