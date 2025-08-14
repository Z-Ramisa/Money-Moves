import React, { useState } from "react";

export type Transaction = {
  id: string;
  type: "income" | "expense";
  title: string;
  amount: number;
  category: string;
  date: string;
};

type Props = {
  type: "income" | "expense";
  onSubmit: (transaction: Transaction) => void;
  darkMode?: boolean; 
};

const TransactionForm: React.FC<Props> = ({ type, onSubmit, darkMode }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }
    if (amount <= 0) {
      alert("Amount must be positive.");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      title,
      amount: Number(amount),
      category,
      date,
    };
    onSubmit(newTransaction);
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const categories =
    type === "income"
      ? ["Salary", "Freelance", "Investment", "Other"]
      : ["Food", "Transport", "Shopping", "Bills", "Other"];

  const inputBg = darkMode ? "bg-gray-700 text-white" : "bg-white text-black";
  const selectBg = darkMode ? "bg-gray-700 text-white" : "bg-white text-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full border rounded px-2 py-1 ${inputBg}`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          className={`w-full border rounded px-2 py-1 ${inputBg}`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full border rounded px-2 py-1 ${selectBg}`}
        >
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full border rounded px-2 py-1 ${inputBg}`}
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded text-white ${
          type === "income" ? "bg-green-500" : "bg-red-500"
        } hover:opacity-90`}
      >
        Add {type === "income" ? "Income" : "Expense"}
      </button>
    </form>
  );
};

export default TransactionForm;
