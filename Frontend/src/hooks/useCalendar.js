import { useReducer } from "react";

function calendarReducer(state, action) {
  switch (action.type) {
    case "PREV_MONTH":
      return {
        ...state,
        month: state.month === 0 ? 11 : state.month - 1,
        year: state.month === 0 ? state.year - 1 : state.year,
      };
    case "NEXT_MONTH":
      return {
        ...state,
        month: state.month === 11 ? 0 : state.month + 1,
        year: state.month === 11 ? state.year + 1 : state.year,
      };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.date };
    default:
      return state;
  }
}

export default function useCalendar() {
  const today = new Date();
  const [state, dispatch] = useReducer(calendarReducer, {
    month: today.getMonth(),
    year: today.getFullYear(),
    selectedDate: today.toISOString().split("T")[0],
  });

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
  }

  function buildCalendarDays() {
    const days = [];
    const totalDays = getDaysInMonth(state.month, state.year);
    const firstDay = getFirstDayOfMonth(state.month, state.year);
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(state.year, state.month, d);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  }

  const todayStr = today.toISOString().split("T")[0];

  function isFuture(dateStr) {
    return dateStr > todayStr;
  }

  return {
    ...state,
    dispatch,
    days: buildCalendarDays(),
    todayStr,
    isFuture,
    monthLabel: new Date(state.year, state.month).toLocaleDateString("en-GB", {
      month: "long", year: "numeric"
    }),
  };
}