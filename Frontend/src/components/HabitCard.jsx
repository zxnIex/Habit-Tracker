function HabitCard({ habit, onComplete }) {
  return (
    <li className="habit-row">
      <div className="habit-info">
        <span className={`habit-name ${habit.completed ? "done" : ""}`}>
          {habit.name}
        </span>
        <span className="streak">{habit.streak} day streak</span>
      </div>
      <button
        className="complete-btn"
        onClick={() => onComplete(habit.id)}
        disabled={habit.completed}
      >
        {habit.completed ? "Done" : "Complete"}
      </button>
    </li>
  );
}

export default HabitCard;