import HabitCard from "./habitcard.jsx";

function HabitList({ habits, onComplete }) {
  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onComplete={onComplete} />
      ))}
    </ul>
  );
}

export default HabitList;