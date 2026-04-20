const dateEl = document.getElementById("today-date");
const today = new Date();
dateEl.textContent = today.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

document.querySelectorAll(".complete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = btn.closest(".habit-row");
    const nameEl = row.querySelector(".habit-name");
    const streakEl = row.querySelector(".streak");

    nameEl.classList.add("done");
    btn.disabled = true;
    btn.textContent = "Done";

    const current = parseInt(streakEl.textContent) || 0;
    streakEl.textContent = `${current + 1} day streak`;
  });
});

document.getElementById("add-btn").addEventListener("click", addHabit);
document.getElementById("habit-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addHabit();
});

function addHabit() {
  const input = document.getElementById("habit-input");
  const name = input.value.trim();
  if (!name) return;

  const list = document.getElementById("habit-list");
  const li = document.createElement("li");
  li.className = "habit-row";
  li.innerHTML = `
    <div class="habit-info">
      <span class="habit-name">${name}</span>
      <span class="streak">0 day streak</span>
    </div>
    <button class="complete-btn">Complete</button>
  `;

  li.querySelector(".complete-btn").addEventListener("click", function () {
    li.querySelector(".habit-name").classList.add("done");
    this.disabled = true;
    this.textContent = "Done";
  });

  list.appendChild(li);
  input.value = "";
}