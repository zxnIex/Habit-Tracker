import { useState } from "react";

export default function useHabitForm(onSubmit) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("general");
  const [frequency, setFrequency] = useState("daily");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Habit name is required";
    if (name.trim().length > 40) newErrors.name = "Name must be under 40 characters";
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(name, category, frequency);
    setName("");
    setCategory("general");
    setFrequency("daily");
    setErrors({});
  }

  return {
    name, setName,
    category, setCategory,
    frequency, setFrequency,
    errors,
    handleSubmit,
  };
}