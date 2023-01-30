import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
  habitId: string;
}

const Checkbox = ({
  title,
  checked = false,
  habitId,
  ...rest
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center gap-x-3 mt-2"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg justify-center items-center ml-3"
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Feather name="check" className="" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg justify-center items-center ml-3" />
      )}
      <View>
        <Text className="text-white text-base font-medium">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;
