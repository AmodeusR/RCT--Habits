import * as Popover from "@radix-ui/react-popover";
import ProgressBar from "./ProgressBar";
import clsx from "clsx";
import { X } from "phosphor-react";
import dayjs from "dayjs";
import HabitsList from "./HabitsList";
import { useState } from "react";

type HabitDayProps = {
  defaultCompleted?: number;
  amount?: number;
  date: Date;
};

const HabitDay = ({
  amount = 0,
  defaultCompleted = 0,
  date,
}: HabitDayProps) => {
  const [completedHabits, setcompletedHabits] = useState(defaultCompleted);
  const completedInPercentage =
    amount > 0 ? Math.round((completedHabits / amount) * 100) : 0;
  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeekName = dayjs(date).format("dddd");

  const handleCompletedChange = (completedCount: number) => {
    setcompletedHabits(completedCount);
  };

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          "w-10 h-10 border-2  rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800": completedInPercentage === 0,
            "bg-violet-900 border-violet-700":
              completedInPercentage >= 1 && completedInPercentage < 20,
            "bg-violet-800 border-violet-600":
              completedInPercentage >= 20 && completedInPercentage < 40,
            "bg-violet-700 border-violet-500":
              completedInPercentage >= 40 && completedInPercentage < 60,
            "bg-violet-600 border-violet-500":
              completedInPercentage >= 60 && completedInPercentage < 80,
            "bg-violet-500 border-violet-400": completedInPercentage >= 80,
          }
        )}
      />

      <Popover.Portal>
        <Popover.Content className="relative min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col ">
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          <Popover.Close className="absolute top-6 right-4 text-zinc-400 hover:text-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded-lg">
            <X
              size={24}
              weight="bold"
            />
          </Popover.Close>
          <span className="text-zinc-400 font-medium text-sm">
            {dayOfWeekName}
          </span>
          <span className="text-3xl font-bold text-white">{dayAndMonth}</span>
          <ProgressBar progress={completedInPercentage} />
          <HabitsList date={date} onCompletedChange={handleCompletedChange} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default HabitDay;
