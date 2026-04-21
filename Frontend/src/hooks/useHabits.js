import { useState, useEffect } from "react";

export default function useHabits() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");

    try {
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
    });

  function addHabit(name) {
    if (!name.trim()) return;

    const newHabit = {
      id: Date.now(),
      name,
      streak: 0,
      completed: false,
    };

    setHabits(prev => [...prev, newHabit]);
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  }

  function completeHabit(id) {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id
          ? { ...habit, completed: !habit.completed, streak: !habit.completed ? habit.streak + 1 : habit.streak, }
          : habit
      )
    );
  }

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits]);

  return {
    habits,
    addHabit,
    deleteHabit,
    completeHabit,
  };
}