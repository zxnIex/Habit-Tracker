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
      lastCompleted: null, 
    };

    setHabits(prev => [...prev, newHabit]);
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  }

  function completeHabit(id) {
    const today = new Date().toDateString();

    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== id) return habit;

        if (habit.lastCompleted === today) return habit;

        return {
          ...habit,
          completed: true,
          streak: habit.lastCompleted
            ? habit.streak + 1
            : 1,
          lastCompleted: today,
        };
      })
    );
  }

  useEffect(() => {
    const today = new Date().toDateString();

    setHabits(prev =>
      prev.map(habit => ({
        ...habit,
        completed: habit.lastCompleted === today,
      }))
    );
  }, []);

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