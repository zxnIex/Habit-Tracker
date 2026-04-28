import useHabitForm from "../hooks/useHabitForm";

const CATEGORIES = ["general", "health", "work", "personal", "fitness"];
const FREQUENCIES = ["daily", "weekly"];

export default function AddHabitForm({ onAdd }) {
  const { name, setName, category, setCategory, frequency, setFrequency, errors, handleSubmit } = useHabitForm(onAdd);

  return (
    <div className="add-section">
      <p className="add-label">Add habit</p>

      <div className="form-field">
        <input
          type="text"
          placeholder="e.g. Go for a walk"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
      </div>

      <div className="form-row">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={frequency} onChange={e => setFrequency(e.target.value)}>
          {FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
}