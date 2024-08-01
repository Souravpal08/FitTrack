import mongoose from "mongoose";
const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,

    },
    workoutName: {
        type: String,
        required: true,
        unique: true
    },

    weight: {
        type: Number,
    },
    sets: {
        type: Number,

    },
    duration: {
        type: Number,
    },
    caloriesBurned: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    reps: {
        type: Number,
    },

},
    { timestamps: true });

export default mongoose.model("Workout", WorkoutSchema);