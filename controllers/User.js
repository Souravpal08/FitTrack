import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img } = req.body;

        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createError(409, "Email is already used."));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //creating a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            img,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "30d",
        })
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }
};


export const UserLogin = async (req, res, next) => {
    try {
        const { email, password, } = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return next(createError(404, "User not found."));
        }
        console.log(user);

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect password"))
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "30d",
        })
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    };

}

export const getUserDashboard = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"))
        }
        const currentDateFormatted = new Date();
        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()
        );

        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1
        );

        //calculate total calories burnt

        const totalCaloriesBurnt = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            {
              $group: {
                _id: null,
                totalCaloriesBurnt: { $sum: "$caloriesBurned" },
              },
            },
          ]);
          console.log(totalCaloriesBurnt);
      
        //total number of workouts
        const totalWorkouts = await Workout.countDocuments({
            user: userId,
            date: { $gte: startToday, $lt: endToday },
        });
        console.log(totalWorkouts);

        //Calculate average calories burnt per workout
        const avgCaloriesBurntPerWorkout = 
        totalCaloriesBurnt.length > 0
            ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
            : 0;
            console.log(avgCaloriesBurntPerWorkout);


        //Fetch category of workouts
        const categoryCalories = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            {
                $group: {
                    _id: "$category",
                    totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                }
            }
        ]);



        //Format categorydata for piechart
        const pieChartData = categoryCalories.map((category, index) => ({
            id: index,
            value: category.totalCaloriesBurnt,
            label: category._id
        }));

        const weeks = [];
        const caloriesBurnt = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(
                currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
            );
            weeks.push(`${date.getDate()}th`);

            const startOfDay = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );

            const endOfDay = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
            );

            const weekData = await Workout.aggregate([
                {
                    $match: {
                        user: user._id,
                        date: { $gte: startOfDay, $lt: endOfDay },
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                    }
                },
                {
                    $sort: { _id: 1 }, //sort by date in ascending order
                }
            ]);
           // console.log(weekData);

            caloriesBurnt.push(
                weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
            );

        }

        return res.status(200).json({
            totalCaloriesBurnt:
                totalCaloriesBurnt.length > 0
                    ? totalCaloriesBurnt[0].totalCaloriesBurnt
                    : 0,
            totalWorkouts: totalWorkouts,
            avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
            totalWeeksCaloriesBurnt: {
                weeks: weeks,
                caloriesBurned: caloriesBurnt
            },
            pieChartData: pieChartData,
        })



    } catch (err) {
        next(err)
    }
};

export const getWorkoutsByDate = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        let date = req.query.date ? new Date(req.query.date) : new Date();
        if (!user) {
            return next(createError(404, "User not found☹️"));
        }
        const startOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        const endOfDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        );

        const todaysWorkouts = await Workout.find({
            userId: userId,
            date: { $gte: startOfDay, $lt: endOfDay },

        });

        const totalCaloriesBurnt = todaysWorkouts.reduce(
            (total, workout) => total + workout.caloriesBurned,
            0
        );

        return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt })

    } catch (err) {
        next(err);
    }
};

export const addWorkout = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        console.log(userId)
        const { workoutString } = req.body;
        if (!workoutString) {
            return next(createError(400, "Workout string is missing"));
        }

        //split workoutstring into lines
        const eachWorkout = workoutString.split(";").map((line) => line.trim());
        //to check any workout start with "#" to indicate categories

        const categories = eachWorkout.filter((line) => line.startsWith("#"));
        if (categories.length === 0) {
            return next(createError(400, "No categories found in workoutstring"));

        }
        const parseWorkouts = [];
        let currentCategory = "";
        let count = 0;

        //through the loop in everyline parse workout
        await eachWorkout.forEach((line) => {
            count++;
            if (line.startsWith("#")) {
                const parts = line?.split("\n").map((part) => part.trim())
                console.log(parts);
                if (parts.length < 5) {
                    return next(
                        createError(400, `Workout string is missing for ${count}th workout`)
                    );
                }

                //update current category
                currentCategory = parts[0].substring(1).trim();
                //Extract workout details
                const workoutDetails = parseWorkoutLine(parts);
                if (workoutDetails == null) {
                    return (createError(400, "Please enter the correct format"));
                }
                if (workoutDetails) {
                    //add category of workoutdetails
                    workoutDetails.category = currentCategory;
                    parseWorkouts.push(workoutDetails);
                }
            } else {
                return next(
                    createError(400, `workout string is missing for ${count}th workout`)
                )
            }
        });

        //Calculate the burnt calories for each workout

        parseWorkouts.forEach(async (workout) => {
            workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
            await Workout.create({ ...workout, user: userId });
        });

        return res.status(201).json({
            message: "Workouts added succesfully🤩",
            workouts: parseWorkouts
        });

    } catch (err) {
        next(err)
    }
}

//function to parse workout details in a aline
const parseWorkoutLine = (parts) => {
    const details = {};
    console.log(parts);
    if (parts.length >= 5) {
        details.workoutName = parts[1].substring(1).trim();
        details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
        details.reps = parseInt(
            parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
        );
        details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
        details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
        console.log(details);
        return details;
    }
    return null;
};

//function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
    const durationInMinutes = parseInt(workoutDetails.duration);
    const weightInKg = parseInt(workoutDetails.weight);
    const caloriesBurntPerMinute = 5; //sample value
    return durationInMinutes * caloriesBurntPerMinute * weightInKg
};

