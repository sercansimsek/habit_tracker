import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import Header from "./components/Header";
import { isSameDay } from "date-fns";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((prev) => prev.filter((item) => item.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }
        const alreadyDone = item.completions.some((day) =>
          isSameDay(day, date),
        );
        const completions = alreadyDone
          ? item.completions.filter((day) => !isSameDay(day, date))
          : [...item.completions, date];

        return { ...item, completions };
      }),
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        deleteHabit={deleteHabit}
        toggleHabit={toggleHabit}
      />
    </div>
  );
}
