import useHabits from "./hooks/useHabits";
import HabitList from "./components/HabitList";
import StreakChart from "./components/StreakChart";
import { useState } from "react";

function App() {
  const { habits, addHabit, completeHabit, deleteHabit } = useHabits();
  const [input, setInput] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="container">
      <header>
        <h1>Habit Tracker</h1>
        <p className="date">{today}</p>
      </header>

      <HabitList habits={habits} onComplete={completeHabit} onDelete={deleteHabit} />

      <StreakChart habits={habits} />

      <div className="add-section">
        <p className="add-label">Add habit</p>
        <div className="add-form">
          <input
            type="text"
            placeholder="e.g. Go for a walk"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { addHabit(input); setInput(""); } }}
          />
          <button onClick={() => { addHabit(input); setInput(""); }}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;