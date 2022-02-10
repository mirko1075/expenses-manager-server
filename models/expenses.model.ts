import mongoose from 'mongoose';
const { Schema } = mongoose;

const expensesSchema = new Schema({
  type: String,
  shortDescription: String,
  source: String,
  category: { type: Schema.Types.ObjectId, ref: "Categories" },
  categoryDescription: String,
  description: String,
  dateOperation: Date,
  amount: Number,
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  });

const categoriesSchema = new Schema(
  {
    name: String,
    categoryDescription: String,
  },
  {
    timestamps: true,
  }
);

const Expenses = mongoose.model('Expenses', expensesSchema);
const Categories = mongoose.model('Categories', categoriesSchema);

export {Expenses, Categories};