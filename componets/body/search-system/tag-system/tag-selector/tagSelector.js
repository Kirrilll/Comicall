import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useState } from "react/cjs/react.development";
import { useSelector } from "../../../../../hooks/useSelector";
import SelectorBtn from "../../../selector-button/selectorButton";
import SelectorList from "../../../selector-list/selectorList";
import Selector from "./selector/selector";

const TagSelector = () => {
  //const [isShown, setIsShown] = useState(false);

  const { handler, height, angle } = useSelector();

  return (
    <View style={styles.container}>
      <Text>Жанры</Text>
      <SelectorBtn setIsShown={handler} angle={angle}></SelectorBtn>
      <View style={styles.wrapper}>
        <SelectorList height={height}></SelectorList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
});

export default TagSelector;
