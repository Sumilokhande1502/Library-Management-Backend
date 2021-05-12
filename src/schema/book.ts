import * as mongoose from "mongoose";


const BookSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    edition: { type: Number }
  },
  { timestamps: true }
  );
  
const Book = mongoose.model("Book", BookSchema);

export default Book;