import { isSameDay } from "date-fns";
import { useState, type ReactNode } from "react";
import { HabitContext } from "./useHabits";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
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
    <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext>
  );
}
