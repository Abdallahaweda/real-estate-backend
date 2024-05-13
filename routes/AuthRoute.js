import  Express  from "express";
import { signup } from "../controllers/AuthController.js";


const router=Express.Router()

router.post("/signup",signup)

export default router;