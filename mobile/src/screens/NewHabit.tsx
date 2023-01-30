import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Checkbox from "../components/Checkbox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const weekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const NewHabit = () => {
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  const handleToggleWeekDays = (weekDayIndex: number) => {
    if (checkedWeekDays.includes(weekDayIndex)) {
      const newCheckedWeekDays = checkedWeekDays.filter(
        (weekDay) => weekDay !== weekDayIndex
      );
      setCheckedWeekDays(newCheckedWeekDays);
    } else {
      setCheckedWeekDays([...checkedWeekDays, weekDayIndex]);
    }
  };

  const createNewHabit = async () => {
    if (!title.trim() || checkedWeekDays.length === 0) {
      return Alert.alert("Ah não!", "Você precisa escrever um compromisso e selecionar os dias para cumpri-lo!")
    }
    try {      
      await api.post("habits", {
        title,
        weekDays: checkedWeekDays
      });

      setTitle("");
      setCheckedWeekDays([]);
      Alert.alert("Parabéns!", "Seu hábito foi criado!");
    } catch (error) {
      Alert.alert("Oops!", "Algo deu errado na criação do seu hábito :(");
      console.error(error);      
    }
  }

  return (
    <View className="flex-1 bg-background pt-16 px-8">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text className="text-white text-3xl mt-10 font-extrabold">
          Criar hábito
        </Text>
        <Text className="text-white text-base mt-6 font-semibold">
          Qual é o seu comprometimento?
        </Text>
        <TextInput
          className="bg-zinc-900 h-12 rounded-lg mt-2 border-2 border-zinc-800 focus:border-green-500 text-white p-2"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
          
        />
        <Text className="text-white text-base mt-6 font-semibold">
          Qual a recorrência?
        </Text>
        {weekDays.map((weekDay, i) => (
          <Checkbox
            key={weekDay + i}
            title={weekDay}
            checked={checkedWeekDays.includes(i)}
            onPress={() => handleToggleWeekDays(i)}
          />
        ))}
        <TouchableOpacity
          className="bg-green-600 flex-row justify-center items-center p-4 mt-6 rounded-lg"
          activeOpacity={0.7}
          onPress={createNewHabit}
        >
          <Feather name="check" size={20} color="white" />
          <Text className="font-semibold text-base text-white ml-1">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewHabit;
