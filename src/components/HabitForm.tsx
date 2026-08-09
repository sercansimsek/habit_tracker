import { useState, type SubmitEvent } from "react";
import { Button } from "./Button";

export default function HabitForm() {
  const [name, setName] = useState("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (name.trim() === "") return;
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."
      />
      <Button
        className="rounded-lg px-4 py-2 font-medium"
        disabled={name.trim() === ""}
      >
        Add Habit
      </Button>
    </form>
  );
}
