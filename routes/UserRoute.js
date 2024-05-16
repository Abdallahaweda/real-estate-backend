import  Express  from "express";
import { test, updateUSer } from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=Express.Router()

router.get("/test",test)
router.post('/update/:id',verifyToken,updateUSer)


export default router;