import mongoose, { Schema, ObjectId } from "mongoose";

const Faculty = mongoose.model(
  "Faculty",
  new Schema({
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
      required: true,
      // Model validation
      validate: {
        validator: () => this.name.length > 3,
        message: `Class's name must be at least 4 characters. Eg: C21101`,
      },
    },
  })
);

export default Klass;