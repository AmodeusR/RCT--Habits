import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import React from "react";
import clsx from "clsx";
import dayjs from "dayjs";

interface HabitDayProps extends TouchableOpacityProps {
  amount?: number;
  completed?: number;
  date: Date;
}

const screenHorizontalPadding = (32 * 2) / 5;

export const dayMarginBetween = 8;
export const daySize =
  Dimensions.get("screen").width / 7 - (screenHorizontalPadding + 5);

const HabitDay = ({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) => {
  const completedInPercentage = amount > 0 ? Math.floor((completed / amount) * 100) : 0;
  
  const today = dayjs().startOf("day").toDate();
  const isToday = dayjs(date).startOf("day").isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2  m-1", {
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
        "border-3 border-zinc-200": isToday
      })}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      {...rest}
    />
  );
};

export default HabitDay;
