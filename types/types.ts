export interface ExpenseType { 
  _id: string,
  type: string,
  shortDescription: string,
  source: string,
  category: number,
  description: string,
  dateOperation: Date,
  amount: number,
  timestamps: number
};

export interface CategoryType { 
  _id: string,
  categoryDescription: string,
  timestamps:number 
};

