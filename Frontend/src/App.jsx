import useHabits from "./hooks/useHabits";
import useFilter from "./hooks/useFilter";
import HabitList from "./components/habitlist";
import AddHabitForm from "./components/AddHabitForm";
import FilterBar from "./components/FilterBar";
import StreakChart from "./components/StreakChart";
import TopBar from "./components/TopBar";

export default function App() {
  const { habits, addHabit, deleteHabit, completeHabit, getStreak } = useHabits();
  const { filtered, activeCategory, setActiveCategory, categories } = useFilter(habits);

  return (
    <>
      <TopBar habits={habits} />
      <div className="layout">
        <FilterBar categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <HabitList
          habits={filtered}
          onComplete={completeHabit}
          onDelete={deleteHabit}
          getStreak={getStreak}
        />
        <AddHabitForm onAdd={addHabit} />
        <StreakChart habits={filtered} getStreak={getStreak} />
      </div>
    </>
  );
}