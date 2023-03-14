import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import Index from "./src/navigation";

enableScreens();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Index />
  );
}
