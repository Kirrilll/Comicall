import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import ComicView from "./componets/comic-pages/comicView";
import GlobalLibrary from "./componets/global-library/globalLibrary";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useData from "./hooks/useData";
import { AppContex } from "./componets/appContex";

export default function App() {
  let [isLoaded] = Font.useFonts({
    "caveat-bold": require("../Comicall/assets/fonts/Caveat-Bold.ttf"),
    "caveat-medium": require("../Comicall/assets/fonts/Caveat-Medium.ttf"),
    "caveat-regular": require("../Comicall/assets/fonts/Caveat-Regular.ttf"),
    "caveat-semibold": require("../Comicall/assets/fonts/Caveat-SemiBold.ttf"),
  });

  const Stack = createNativeStackNavigator();
  //Массив комиксов сожержит страницы комикса, название, автора, краткое описание, закладку(initialState = 0, начинаем всегда  с закладки)

  //route/params не может быть callback так как он ломает управлением стэйтом
  //Сделать стратегию в качестве undo(back btn)

  const {data, addMarkbook } = useData();

  return isLoaded ? (
    <AppContex.Provider value = {{data, addMarkbook}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Library"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Library" component={GlobalLibrary}></Stack.Screen>
          <Stack.Screen
            name="Comic"
            component={ComicView}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContex.Provider>
  ) : (
    <ActivityIndicator></ActivityIndicator>
  );
}
