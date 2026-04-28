import { useRef, useState } from "react";
import useCalendar from "../hooks/useCalendar";

export default function HabitCard({ habit, onComplete, onDelete, getStreak, openCalendarId, setOpenCalendarId }) {
  const cardRef = useRef(null);
  const { month, year, selectedDate, dispatch, days, todayStr, isFuture, monthLabel } = useCalendar();
  const isOpen = openCalendarId === habit.id;

  function handleComplete() {
    onComplete(habit.id, todayStr);
    if (cardRef.current) {
      cardRef.current.classList.add("pop");
      setTimeout(() => cardRef.current?.classList.remove("pop"), 300);
    }
  }

  function toggleCalendar() {
    setOpenCalendarId(isOpen ? null : habit.id);
  }

  function getIntensity(dateStr) {
    if (!habit.completedDates.includes(dateStr)) return "";
    return "intensity-high";
  }

  const done = habit.completedDates.includes(todayStr);

  return (
    <li className="habit-row" ref={cardRef}>
      <div className="habit-top">
        <div className="habit-info">
          <span className={`habit-name ${done ? "done" : ""}`}>{habit.name}</span>
          <span className="habit-meta">
            <span className="category-badge">{habit.category}</span>
            <span className="streak">{getStreak(habit)} day streak</span>
          </span>
        </div>
        <div className="habit-actions">
          <button className={done ? "complete-btn done-btn" : "complete-btn"} onClick={handleComplete} disabled={done}>
            {done ? "Done" : "Complete"}
          </button>
          <button className="delete-btn" onClick={() => onDelete(habit.id)}>Delete</button>
        </div>
      </div>

      <button className="calendar-toggle" onClick={toggleCalendar}>
        {isOpen ? "Hide calendar ↑" : "Show calendar ↓"}
      </button>

      {isOpen && (
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
                  dateStr === todayStr ? "today" : "",
                  dateStr === selectedDate ? "selected" : "",
                  isFuture(dateStr) ? "future" : "",
                  dateStr ? getIntensity(dateStr) : "",
                ].join(" ").trim()}
                onClick={() => {
                  if (!dateStr || isFuture(dateStr)) return;
                  dispatch({ type: "SELECT_DATE", date: dateStr });
                  onComplete(habit.id, dateStr);
                }}
              >
                {dateStr ? new Date(dateStr + "T00:00:00").getDate() : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}