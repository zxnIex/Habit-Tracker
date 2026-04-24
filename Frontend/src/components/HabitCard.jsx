function HabitCard({ habit, onComplete, onDelete }) {
  return (
    <li className="habit-row">
      <div className="habit-info">
        <span className={`habit-name ${habit.completed ? "done" : ""}`}>
          {habit.name}
        </span>
        <span className="streak">{habit.streak} day streak</span>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          className="complete-btn"
          onClick={() => onComplete(habit.id)}
          disabled={habit.completed}
        >
          {habit.completed ? "Done" : "Complete"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default HabitCard;