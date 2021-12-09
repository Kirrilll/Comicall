import React from "react";
import { View, Text, StyleSheet, ImageBackground, useWindowDimensions } from "react-native";
import Header from "./componets/header/header";
import Search from "./componets/search/search";
import GlobalLibraryContainer from "./componets/body/global-library-container/globalLibraryContainer";
import Footer from "./componets/footer/footer";

export default function App() {

  const window = useWindowDimensions();

  
  return (
    <View style={{ flexDirection: "column", height: window.height }}>
      <Header></Header>

      <View style={styles.body}>
        <ImageBackground style = {styles.background} resizeMode = "cover" source = {require('../Comicall/assets/background/background.png') }>
          <Search></Search>
          <View style={styles.conainer}>
            <GlobalLibraryContainer></GlobalLibraryContainer>
          </View>
        </ImageBackground>
      </View>

      <Footer/>
    </View>
  );
}



const styles = StyleSheet.create({
  conainer: {
    padding: 14,
  },
  background:{
    flex:1
  },
  body: {
    flex: 1
  }
 
});
