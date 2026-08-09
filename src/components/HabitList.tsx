import { Button } from "./Button";
import { eachDayOfInterval, endOfWeek, startOfWeek, format } from "date-fns";

export type Habit = {
  id: string;
  name: string;
};

type HabitListProps = {
  habits: Habit[];
  deleteHabit: (id: string) => void;
};

export default function HabitList({ habits, deleteHabit }: HabitListProps) {
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
          ></HabitItem>
        );
      })}
    </div>
  );
}

type HabitItemProps = {
  habit: Habit;
  deleteHabit: (id: string) => void;
};

function HabitItem({ habit, deleteHabit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });
  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">🔥 3</span>
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
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span className="font-medium">{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
