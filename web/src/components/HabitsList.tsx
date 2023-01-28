import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

type HabitsListProps = {
  date: Date;
  onCompletedChange: (completed: number) => void;
};

type HabitsInfo = {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: Date;
  }>;
  completedHabits: string[];
};

const HabitsList = ({ date, onCompletedChange }: HabitsListProps) => {
  const [habits, setHabits] = useState<HabitsInfo>();
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const handleHabitToggle = async (habitId: string) => {
    await api.patch(`habits/${habitId}/toggle`);

    const isHabitCompleted = habits?.completedHabits.includes(habitId);
    let completedHabits: string[] = [];

    if (isHabitCompleted) {
      completedHabits = habits!.completedHabits.filter(
        (habit) => habit !== habitId
      );
    } else {
      completedHabits = [...habits!.completedHabits, habitId];
    }

    setHabits({
      completedHabits,
      possibleHabits: habits!.possibleHabits,
    });

    onCompletedChange(completedHabits.length);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get("day", {
        params: {
          date: date.toISOString(),
        },
      });
      const tasksData = await response.data;

      setHabits(tasksData);
    };
    fetchTasks();
  }, []);

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        {habits?.possibleHabits.map((possibleHabit) => (
          <Checkbox.Root
            className="flex items-center gap-2 group focus:outline-none disabled:cursor-not-allowed"
            onCheckedChange={() => handleHabitToggle(possibleHabit.id)}
            key={possibleHabit.id}
            checked={habits.completedHabits.includes(possibleHabit.id)}
            disabled={isDateInPast}
          >
            <div className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg flex justify-center items-center group-data-[state=checked]:bg-green-600 group-data-[state=checked]:border-none transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} color="white" weight="bold" />
              </Checkbox.Indicator>
            </div>
            <span className="font-semibold text-white text-xl leading-tight group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through ">
              {possibleHabit.title}
            </span>
          </Checkbox.Root>
        ))}
      </div>
    </>
  );
};

export default HabitsList;
