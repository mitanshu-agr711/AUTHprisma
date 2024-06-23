import { Router } from "express";
import AuthController from "../controller/user.controller.js";

const router = Router();

// Register route
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);


export default router;
