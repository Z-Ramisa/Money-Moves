import React, { useState, useEffect } from "react";
import TransactionForm, { type Transaction } from "./components/TransactionForm";
import { FaMoon, FaSun, FaTrash, FaPlusCircle, FaCoins} from "react-icons/fa";


const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    if (transaction.type === "income") setShowIncomeModal(false);
    else setShowExpenseModal(false);
  };

  const deleteTransaction = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const bgColor = darkMode ? "#121212" : "#f3f3f3";
  const textColor = darkMode ? "#ffffff" : "#000000";
  const cardBg = darkMode ? "#1e1e1e" : "#ffffff";
  const overlayBg = darkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)";
  const buttonBg = darkMode ? "#333" : "#ddd";

  return (
    <div style={{ backgroundColor: bgColor, color: textColor, minHeight: "100vh" }}>
<header
  style={{
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", 
  }}
>
  <div className="flex items-center gap-4">
   
   <FaCoins className="text-yellow-400 text-5xl sm:text-6xl md:text-7xl animate-bounce" />


   
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold font-[Comic Sans] text-green-900 dark:text-green-900 decoration-blue-400 decoration-4">
        Money Moves
      </h1>
      <h2 className="text-xl font-semibold font-[Tahoma] text-gray-700 dark:text-gray-300">
        Track your everyday expenses
      </h2>
    </div>
  </div>

  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      fontSize: "1.5rem",
      padding: "0.5rem",
      borderRadius: "0.25rem",
    }}
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>
</header>



      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>Net Balance:</p>
        
        <span style={{ fontSize: "2rem", fontWeight: "bold", color: netBalance >= 0 ? "#28a745" : "#dc3545" }}>
          ৳{netBalance}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", margin: "1rem 0" }}>
        <button
          onClick={() => setShowIncomeModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#28a745", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer" }}
        >
          <FaPlusCircle /> Add Income
        </button>
        <button
          onClick={() => setShowExpenseModal(true)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#dc3545", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem", cursor: "pointer" }}
        >
          <FaPlusCircle /> Add Expense
          
        </button>
      </div>

      <section style={{ display: "flex", justifyContent: "space-around", padding: "1rem", backgroundColor: cardBg, borderRadius: "0.5rem", margin: "1rem", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <div>
          <p>Total Income</p>
          <p style={{ color: "#28a745", fontWeight: "bold" }}>৳{totalIncome}</p>
        </div>
        <div>
          <p>Total Expense</p>
          <p style={{ color: "#dc3545", fontWeight: "bold" }}>৳{totalExpense}</p>
        </div>
        <div>
          <p>Net Balance</p>
          <p style={{ fontWeight: "bold" }}>${netBalance}</p>
        </div>
      </section>

      <section style={{ padding: "0 1rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Transactions</h2>
        {transactions.length === 0 && <p>No transactions yet.</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((t) => (
            <li key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", marginBottom: "0.5rem", backgroundColor: cardBg, borderRadius: "0.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
              <div>
                <p style={{ fontWeight: "600" }}>{t.title}</p>
                <p style={{ fontSize: "0.875rem", color: darkMode ? "#ccc" : "#666" }}>{t.category} | {t.date}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <p style={{ color: t.type === "income" ? "#28a745" : "#dc3545", fontWeight: "bold" }}>৳{t.amount}</p>
                <button onClick={() => deleteTransaction(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: darkMode ? "#ccc" : "#666" }}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

   





      {showIncomeModal && (
        <div style={{ position: "fixed", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: overlayBg }}>
          <div style={{ backgroundColor: cardBg, color: textColor, padding: "1.5rem", borderRadius: "0.5rem", width: "24rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Add Income</h3>
            <TransactionForm type="income" onSubmit={addTransaction} darkMode={darkMode} />
            <button onClick={() => setShowIncomeModal(false)} style={{ width: "100%", padding: "0.5rem", marginTop: "1rem", borderRadius: "0.25rem", backgroundColor: buttonBg, color: textColor }}>Cancel</button>
          </div>
        </div>
      )}

  







      {showExpenseModal && (
        <div style={{ position: "fixed", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: overlayBg }}>
          <div style={{ backgroundColor: cardBg, color: textColor, padding: "1.5rem", borderRadius: "0.5rem", width: "24rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>Add Expense</h3>
            <TransactionForm type="expense" onSubmit={addTransaction} darkMode={darkMode} />
            <button onClick={() => setShowExpenseModal(false)} style={{ width: "100%", padding: "0.5rem", marginTop: "1rem", borderRadius: "0.25rem", backgroundColor: buttonBg, color: textColor }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

export interface Props {
  type: "income" | "expense";
  onSubmit: (transaction: Transaction) => void;
  darkMode: boolean;
}
