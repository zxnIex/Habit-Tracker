import { useState } from "react";
import HabitCard from "./habitcard";

export default function HabitList({ habits, onComplete, onDelete, getStreak }) {
  const [openCalendarId, setOpenCalendarId] = useState(null);

  if (habits.length === 0) return <p className="empty-msg">No habits yet. Add one below.</p>;

  return (
    <ul className="habit-list">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onComplete={onComplete}
          onDelete={onDelete}
          getStreak={getStreak}
          openCalendarId={openCalendarId}
          setOpenCalendarId={setOpenCalendarId}
        />
      ))}
    </ul>
  );
}