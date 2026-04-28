import useCalendar from "../hooks/useCalendar";

export default function Calendar({ habits, onToggle }) {
  const { month, year, selectedDate, dispatch, days, todayStr, isFuture, monthLabel } = useCalendar();

  function getCompletionCount(dateStr) {
    return habits.filter(h => h.completedDates.includes(dateStr)).length;
  }

  function getIntensity(dateStr) {
    const count = getCompletionCount(dateStr);
    if (count === 0) return "";
    if (count <= 1) return "intensity-low";
    if (count <= 3) return "intensity-mid";
    return "intensity-high";
  }

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <button onClick={() => dispatch({ type: "PREV_MONTH" })}>←</button>
        <span className="calendar-title">{monthLabel}</span>
        <button onClick={() => dispatch({ type: "NEXT_MONTH" })}>→</button>
      </div>

      <div className="calendar-grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="calendar-day-label">{d}</div>
        ))}
        {days.map((dateStr, i) => (
          <div
            key={i}
            className={[
              "calendar-day",
              !dateStr ? "empty" : "",
              dateStr === selectedDate ? "selected" : "",
              dateStr === todayStr ? "today" : "",
              isFuture(dateStr) ? "future" : "",
              dateStr ? getIntensity(dateStr) : "",
            ].join(" ").trim()}
            onClick={() => {
              if (!dateStr || isFuture(dateStr)) return;
              dispatch({ type: "SELECT_DATE", date: dateStr });
            }}
          >
            {dateStr ? new Date(dateStr + "T00:00:00").getDate() : ""}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="calendar-habits">
          <p className="add-label">
            {selectedDate === todayStr ? "Today" : selectedDate}
          </p>
          {habits.length === 0 && <p className="empty-msg">No habits yet.</p>}
          {habits.map(habit => {
            const done = habit.completedDates.includes(selectedDate);
            return (
              <div key={habit.id} className={`calendar-habit-row ${done ? "done" : ""}`}>
                <span>{habit.name}</span>
                <button
                  className={done ? "complete-btn done-btn" : "complete-btn"}
                  onClick={() => onToggle(habit.id, selectedDate)}
                >
                  {done ? "Done" : "Mark"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}