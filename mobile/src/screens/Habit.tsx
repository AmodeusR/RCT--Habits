import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import "../lib/dayjs";
import ProgressBar from "../components/ProgressBar";
import Checkbox from "../components/Checkbox";
import { api } from "../lib/axios";
import HabitsEmpty from "../components/HabitsEmpty";
import clsx from "clsx";
import Loading from "../components/Loading";

type HabitsInfoProps = {
  possibleHabits: Array<{
    id: string;
    created_at: Date;
    title: string;
  }>;
  completedHabits: string[];
};

interface Params {
  date: string;
}

const Habit = () => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps>();
  const route = useRoute();
  const { date } = route.params as Params;
  const [isLoading, setIsLoading] = useState(false);

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");
  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  const handleHabitToggle = (habitId: string) => {
    api.patch(`habits/${habitId}/toggle`);

    let completedHabits = habitsInfo!.completedHabits;

    if (completedHabits.includes(habitId)) {
      completedHabits = completedHabits.filter(
        (completeHabitId) => completeHabitId !== habitId
      );
    } else {
      completedHabits = [...completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("day", {
          params: {
            date,
          },
        });
        const data = await response.data;
        setHabitsInfo(data);
        
      } catch (error) {
        console.log(error);
        Alert.alert("Oops!", "Parece que algo deu errado, tente novamente!")
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />

  return (
    <View className="flex-1 bg-background pt-16 px-8">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <BackButton />
        <Text className="text-zinc-400 mt-4 ml-0.5">{dayOfWeek}</Text>
        <Text className="text-3xl text-white mb-1 font-bold">
          {dayAndMonth}
        </Text>
        <ProgressBar
          total={habitsInfo?.possibleHabits.length}
          progress={habitsInfo?.completedHabits.length}
        />
        <View className={clsx("mt-4", { "opacity-70": isDateInPast })}>
          {habitsInfo?.possibleHabits.length !== 0 ? (
            habitsInfo?.possibleHabits.map((habit) => (
              <Checkbox
                key={habit.id}
                habitId={habit.id}
                title={habit.title}
                onPress={() => handleHabitToggle(habit.id)}
                checked={habitsInfo.completedHabits.includes(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
          {isDateInPast && (
            <Text className="text-zinc-300 mt-10 text-center">
              Você não pode editar uma data passada
            </Text>
          )}
      </ScrollView>
    </View>
  );
};

export default Habit;
