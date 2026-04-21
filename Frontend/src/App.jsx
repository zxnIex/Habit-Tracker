import { useState } from "react";
import HabitList from "./components/habitlist";

const initialHabits = [
  { id: 1, name: "Go for a walk", streak: 0, completed: false },
  { id: 2, name: "Read for 20 minutes", streak: 0, completed: false },
  { id: 3, name: "Drink 2L of water", streak: 0, completed: false },
];

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [input, setInput] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  function completeHabit(id) {
    setHabits(habits.map((h) =>
      h.id === id ? { ...h, completed: true, streak: h.streak + 1 } : h
    ));
  }

  function addHabit() {
    const name = input.trim();
    if (!name) return;
    setHabits([...habits, { id: Date.now(), name, streak: 0, completed: false }]);
    setInput("");
  }

  return (
    <div className="container">
      <header>
        <h1>Habit Tracker</h1>
        <p className="date">{today}</p>
      </header>

      <HabitList habits={habits} onComplete={completeHabit} />

      <div className="add-section">
        <p className="add-label">Add habit</p>
        <div className="add-form">
          <input
            type="text"
            className="habit-input"
            placeholder="e.g. Go for a walk"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
          />
          <button onClick={addHabit}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;