import { Button } from "./Button";
import {
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  format,
  isFuture,
  isSameDay,
  subDays,
} from "date-fns";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type HabitListProps = {
  habits: Habit[];
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

export default function HabitList({
  habits,
  deleteHabit,
  toggleHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habbits yet. Add one above to get started
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => {
        return (
          <HabitItem
            key={habit.id}
            habit={habit}
            deleteHabit={deleteHabit}
            toggleHabit={toggleHabit}
          ></HabitItem>
        );
      })}
    </div>
  );
}

type HabitItemProps = {
  habit: Habit;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

function HabitItem({ habit, deleteHabit, toggleHabit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streak = getStreak(habit.completions);
  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          {streak !== 0 && (
            <span className="text-sm text-amber-400">🔥 {streak}</span>
          )}
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant="ghost-destructive"
          className="text-sm"
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1 5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            disabled={isFuture(date)}
            onClick={() => toggleHabit(habit.id, date)}
            variant={
              habit.completions.some((day) => isSameDay(date, day))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span className="font-medium">{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function getStreak(completion: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completion.some((day) => isSameDay(day, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}
