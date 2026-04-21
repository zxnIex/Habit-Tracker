import HabitCard from "./HabitCard.jsx";

function HabitList({ habits, onComplete, onDelete }) {
  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default HabitList;