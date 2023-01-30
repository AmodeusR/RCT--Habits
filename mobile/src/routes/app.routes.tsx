import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import NewHabit from "../screens/NewHabit";
import Home from "../screens/Home";
import Habit from "../screens/Habit";

const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="habit" component={Habit} />
      <Screen name="new-habit" component={NewHabit} />
    </Navigator>
  );
};

export default AppRoutes;
