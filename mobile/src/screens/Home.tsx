import { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import HabitDay, { daySize } from "../components/HabitDay";
import Header from "../components/Header";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { api } from "../lib/axios";
import Loading from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDateSize = 18 * 5;
const ammountOfDaysToFill = minimumSummaryDateSize - datesFromYearStart.length;

type SummaryDay = {
  id: string;
  amount: number;
  completed: number;
  date: Date;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();
  const [summary, setSummary] = useState<SummaryDay[]>([]);

  useFocusEffect(useCallback(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("summary");
        const data = await response.data;
 
        setSummary(data);
      } catch (error) {
        Alert.alert(
          "Oops!",
          "Não foi possível carregar o sumário de hábitos :("
        );
        console.error("Um erro ocorreu: ");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="bg-background flex-1 px-8 justify-center">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            className="text-zinc-400 text-xl font-bold mx-1 text-center"
            key={weekDay + i}
            style={{ width: daySize, height: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => {
            const dayWithHabits = summary.find((summaryDay) =>
              dayjs(date).isSame(summaryDay.date, "day")
            );

            return (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate("habit", { date: date.toISOString() })}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
                date={date}
              />
            );
          })}
          {ammountOfDaysToFill > 0 &&
            Array.from({ length: ammountOfDaysToFill }).map((_, i) => (
              <View
                key={i}
                className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-50"
                style={{ width: daySize, height: daySize }}
              ></View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
