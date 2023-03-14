import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { memo, useCallback } from "react";

const Home = memo<
  React.ComponentProps<typeof View> & {
    navigation: DrawerNavigationHelpers;
  }
>(({ navigation }) => {
  const handlePress = useCallback(() => {
    navigation.openDrawer();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Text style={styles.info}>
        This is a simple App example aboute Repitiles. You can see each reptile
        by Clicking on the button below or by clicking on the menu icon on the
        top left corner.
      </Text>
      <TouchableOpacity onPress={handlePress} style={styles.btn}>
        <Text style={styles.btnTxt}>Open Drawer</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
    height: "60%",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#ff4949",
    padding: 10,
    borderRadius: 10,
  },
});

export default Home;
