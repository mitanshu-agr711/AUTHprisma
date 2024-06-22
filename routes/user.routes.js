import { Router } from "express";
import AuthController from "../controller/user.controller.js";

const router = Router();

// Register route
router.post("/register", AuthController.register);

export default router;
