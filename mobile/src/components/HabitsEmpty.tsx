import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HabitsEmpty = () => {
  const { navigate } = useNavigation();
  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito, comece{" "}
      <Text className="text-violet-400 text-base underline" onPress={() => navigate("new-habit")}>cadastrando um.</Text>
    </Text>
  );
};

export default HabitsEmpty;
