import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const Student = mongoose.model(
  "Student",
  new Schema(
    {
      order: { type: int },

      studentID: { type: int },

      name: {
        type: String,
        required: true, // NOT NULL
        validate: {
          validator: (value) => value.length > 3,
          message: "Name must be at least 3 characters",
        },
      },

      dateOfBirth: {
        type: Date,
        validate: {
          validator: (date) => date instanceof Date && !isNaN(date.getTime()),
          message: "Invalid date of birth",
        },
      },

      gender: {
        type: String,
        enum: {
          values: ["Male", "Female"],
          message: "{VALUE} is not supported",
        },
        required: true,
      },

      class: {
        type: [Schema.Types.ObjectId],
        required: true,
      },

      faculty: {
        type: [Schema.Types.ObjectId],
        required: true,
      },

      scores: {
        type: Number,
        required: false,
        validator: (value) => {
          scores.length >= 1 &&
            scores.length <= 2 &&
            scores >= 1 &&
            scores <= 10;
        },
      },

      classification: {
        type: String,
        required: true,
      },
    },
    {
      autoCreate: false,
      autoIndex: true,
    }
  )
);

export default Student;
