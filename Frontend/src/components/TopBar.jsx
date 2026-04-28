import { useTheme } from "../context/ThemeContext";

export default function TopBar({ habits }) {
  const { dark, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long"
  });
  const todayStr = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter(h => h.completedDates.includes(todayStr)).length;

  return (
    <header className="topbar">
      <div>
        <h1>Habit Tracker</h1>
        <p className="date">{today}</p>
      </div>
      <div className="topbar-right">
        <span className="stat">{completedToday}/{habits.length} today</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {dark ? "☀ Light" : "☾ Dark"}
        </button>
      </div>
    </header>
  );
}