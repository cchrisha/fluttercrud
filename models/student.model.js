const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"]
        },
        lastName: {
            type: String,
            required: [true,"Last name is required"]
        },
        course: {
            type: String,
            required: [true,"Course is required"]
        },
        year: {
            type: Number,
            required: [true,"Year is required"],
            default: 0
        },
        enrolled: {
            type: Boolean,
            required: [true,"Enrolled is required"],
            default: false,
        },
    },
    {
      timestamps: true,
    }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;