import { useMemo, useState } from "react";

export default function useFilter(habits) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return habits;
    return habits.filter(h => h.category === activeCategory);
  }, [habits, activeCategory]);

  const categories = useMemo(() => {
    const cats = habits.map(h => h.category);
    return ["all", ...new Set(cats)];
  }, [habits]);

  return { filtered, activeCategory, setActiveCategory, categories };
}
