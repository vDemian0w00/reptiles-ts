import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { memo } from "react";
import Home from "../screens/Home";
import Reptil from "../screens/Reptil";
import { Text, View } from "react-native";

export type Reptiles = "cocodrile" | "snake" | "lizard" | "turtle";

export type RootDrawerParamsList = {
  Home: undefined;
  showReptileDetails: { reptileSelected: Reptiles };
  cocodrile: undefined;
  lizard: undefined;
  snake: undefined;
  turtle: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamsList>();

const Index = memo(() => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#da8471",
          },
          headerTintColor: "#fff",
          drawerContentContainerStyle: {
            justifyContent: "center",
            marginVertical: 20,
          },
          drawerContentStyle: {
            backgroundColor: "white",
          },
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView
              {...props}
              style={{
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Reptiles
                </Text>
              </View>
              <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate("Home")}
              />
              <DrawerItem
                label="Cocodrile"
                onPress={() =>
                  props.navigation.navigate("showReptileDetails", {
                    reptileSelected: "cocodrile",
                  })
                }
              />
              <DrawerItem
                label="Lizard"
                onPress={() =>
                  props.navigation.navigate("showReptileDetails", {
                    reptileSelected: "lizard",
                  })
                }
              />
              <DrawerItem
                label="Snake"
                onPress={() =>
                  props.navigation.navigate("showReptileDetails", {
                    reptileSelected: "snake",
                  })
                }
              />
              <DrawerItem
                label="Turtle"
                onPress={() =>
                  props.navigation.navigate("showReptileDetails", {
                    reptileSelected: "turtle",
                  })
                }
              />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name={"Home"} component={Home} />
        <Drawer.Screen
          name={"showReptileDetails"}
          component={Reptil}
          options={{ drawerLabel: "Cocodrile", headerTitle: "Reptil" }}
          initialParams={{ reptileSelected: "cocodrile" }}
        />
        {/* <Drawer.Screen name={"cocodrile"} component={Reptil} />
        <Drawer.Screen name={"snake"} component={Reptil} />
        <Drawer.Screen name={"lizard"} component={Reptil} />
        <Drawer.Screen name={"turtle"} component={Reptil} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
});

export default Index;
