import HabitList from "./components/HabitList.jsx";
import useHabits from "./hooks/useHabits.js";
import { useState } from "react";

function App() {
  const { habits, addHabit, completeHabit, deleteHabit } = useHabits();
  const [input, setInput] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  function handleAdd() {
    addHabit(input);
    setInput("");
  }

  return (
    <div className="container">
      <header>
        <h1>Habit Tracker</h1>
        <p className="date">{today}</p>
      </header>

      <HabitList
        habits={habits}
        onComplete={completeHabit}
        onDelete={deleteHabit}
      />

      <div className="add-section">
        <p className="add-label">Add habit</p>

        <div className="add-form">
          <input
            type="text"
            className="habit-input"
            placeholder="e.g. Go for a walk"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />

          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;