import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Logo from "../assets/logo.svg";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { navigate } = useNavigation();


  return (
    <View className="w-full flex-row items-center justify-between mt-20">
      <Logo />
      <TouchableOpacity activeOpacity={0.7} className="flex-row items-center border border-violet-500 rounded-lg px-3 py-2" onPress={() => navigate("new-habit")}>
        <Feather name="plus" color={colors.violet[500]} size={24} />
        <Text className="text-white font-medium ml-2">
          Novo hábito
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
