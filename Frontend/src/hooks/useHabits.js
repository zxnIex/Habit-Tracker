import { useState, useEffect } from "react";

export default function useHabits() {
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem("habits");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  function addHabit(name, category = "general", frequency = "daily") {
    if (!name.trim()) return;
    setHabits(prev => [...prev, {
      id: Date.now(),
      name: name.trim(),
      category,
      frequency,
      completedDates: [],
    }]);
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id));
  }

  function completeHabit(id, dateString) {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit;
      const already = habit.completedDates.includes(dateString);
      const updatedDates = already
        ? habit.completedDates.filter(d => d !== dateString)
        : [...habit.completedDates, dateString];
      return { ...habit, completedDates: updatedDates };
    }));
  }

  function getStreak(habit) {
    const today = new Date();
    let streak = 0;
    let current = new Date(today);
    while (true) {
      const dateStr = current.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return { habits, addHabit, deleteHabit, completeHabit, getStreak };
}
