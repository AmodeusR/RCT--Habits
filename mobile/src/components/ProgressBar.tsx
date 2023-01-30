import { View } from "react-native";
import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type ProgressBarProps = {
  progress?: number;
  total?: number
}

const ProgressBar = ({ progress = 0, total = 0}: ProgressBarProps) => {
  const progressInPercentage = Math.floor((progress / total) * 100);
  const sharedProgress = useSharedValue(progressInPercentage);
  const animatedStyle = useAnimatedStyle(() => ({ width: `${sharedProgress.value}%` }));

  useEffect(() => {
    sharedProgress.value = withTiming(progressInPercentage);
    
  }, [progressInPercentage]);
  
  return (
    <View className="w-full h-3 rounded-lg bg-zinc-800 mt-2">
      <Animated.View className={`bg-violet-500 h-3 rounded-lg`} style={animatedStyle} />
    </View>
  );
};

export default ProgressBar;
