import express from "express";
import { UserLogin, UserRegister, addWorkout, getUserDashboard, getWorkoutsByDate } from "../controllers/User.js";
import { verifyToken } from "../middileware/verifyToken.js";


const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);


router.get("/dashboard", verifyToken,getUserDashboard)
router.get("/workouts", verifyToken, getWorkoutsByDate);
router.post("/workouts", verifyToken,addWorkout)

export default router;