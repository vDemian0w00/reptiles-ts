import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { CarouselRenderItem } from "react-native-reanimated-carousel/lib/typescript/types";
import React, { memo, useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Reptiles } from "../../navigation";
import * as Web from "expo-web-browser";

type ReptileCard = {
  id: number;
  name: Reptiles;
  species: string;
  description: string;
  image: string;
};

const StaticData: {
  reptil: Reptiles;
  data: ReptileCard[];
}[] = [
  {
    reptil: "cocodrile",
    data: [
      {
        id: 1,
        name: "cocodrile",
        species: "Crocodylus niloticus",
        description:
          "The Nile crocodile (Crocodylus niloticus) is a large crocodilian in the family Crocodylidae. It is the second-largest extant reptile, after the saltwater crocodile, and the largest extant crocodilian. It is endemic to sub-Saharan Africa, where it is found in freshwater swamps, lakes, rivers, and marshes. It is also found in brackish water and saltwater.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/NileCrocodile.jpg/1200px-NileCrocodile.jpg",
      },
      {
        id: 2,
        name: "cocodrile",
        species: "Crocodylus porosus",
        description:
          "The saltwater crocodile (Crocodylus porosus) is a large crocodilian in the family Crocodylidae. It is the largest of all living reptiles and the largest extant crocodilian. It is endemic to saltwater habitats in the Indo-Pacific region, including estuaries, mangrove swamps, rivers, and coastal lagoons. It is also found in brackish water and freshwater.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Saltwater_Crocodile_%28Crocodylus_porosus%29_%2810106331165%29.jpg/800px-Saltwater_Crocodile_%28Crocodylus_porosus%29_%2810106331165%29.jpg",
      },
      {
        id: 3,
        name: "cocodrile",
        species: "Crocodylus johnstoni",
        description:
          "The Johnston's crocodile (Crocodylus johnstoni) is a species of crocodilian in the family Crocodylidae. It is endemic to the Northern Territory of Australia. It is a small crocodile, with adults reaching a maximum length of 2.5 m (8.2 ft). It is a diurnal species, and is found in freshwater swamps, rivers, and lakes.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/2f/Freshwater_Crocodile_at_Lone_Pine_Koala_Sanctuary.jpg",
      },
    ],
  },
  {
    reptil: "snake",
    data: [
      {
        id: 1,
        name: "snake",
        species: "Python regius",
        description:
          "The royal python (Python regius) is a species of python found in sub-Saharan Africa. It is a large species of python, with adults reaching a maximum length of 3.5 m (11 ft 6 in). It is a diurnal species, and is found in savannahs, grasslands, and forests.",
        image:
          "https://reptile-database.reptarium.cz/content/photo_rd_11/Python-regius-03000041409_01.jpg",
      },
      {
        id: 2,
        name: "snake",
        species: "Python molurus",
        description:
          "The Burmese python (Python molurus bivittatus) is a species of python found in Southeast Asia. It is a large species of python, with adults reaching a maximum length of 6.1 m (20 ft). It is a diurnal species, and is found in mangrove swamps, forests, and grasslands.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Python_molurus_molurus_2.jpg/250px-Python_molurus_molurus_2.jpg",
      },
      {
        id: 3,
        name: "snake",
        species: "Python sebae",
        description:
          "The carpet python (Python sebae) is a species of python found in Southeast Asia. It is a large species of python, with adults reaching a maximum length of 4.5 m (15 ft). It is a diurnal species, and is found in savannahs, grasslands, and forests.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Adult_Female_Python_sebae_1.33aspect.jpg/1200px-Adult_Female_Python_sebae_1.33aspect.jpg",
      },
    ],
  },
  {
    reptil: "lizard",
    data: [
      {
        id: 1,
        name: "lizard",
        species: "Varanus komodoensis",
        description:
          "The Komodo dragon (Varanus komodoensis) is a species of monitor lizard found in the Indonesian islands of Komodo, Rinca, Flores, Gili Motang, and Padar. It is the largest extant species of lizard, growing to a maximum length of 3 m (9.8 ft) and weighing up to 70 kg (150 lb). It is a diurnal species, and is found in savannahs, grasslands, and forests.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Komodo_dragon_%28Varanus_komodoensis%29.jpg/220px-Komodo_dragon_%28Varanus_komodoensis%29.jpg",
      },
      {
        id: 2,
        name: "lizard",
        species: "Varanus salvator",
        description:
          "The water monitor (Varanus salvator) is a species of monitor lizard found in Southeast Asia. It is a large species of monitor, with adults reaching a maximum length of 2.7 m (8.9 ft). It is a diurnal species, and is found in mangrove swamps, forests, and grasslands.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Varanus_salvator_-_01.jpg",
      },
      {
        id: 3,
        name: "lizard",
        species: "Varanus albigularis",
        description:
          "The bearded dragon (Pogona vitticeps) is a species of lizard in the family Agamidae. It is endemic to Australia, where it is found in arid and semi-arid regions. It is a diurnal species, and is found in savannahs, grasslands, and forests.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/3e/White-throated_Monitor_%28Varanus_albigularis%29_%285984080381%29.jpg",
      },
    ],
  },
  {
    reptil: "turtle",
    data: [
      {
        id: 1,
        name: "turtle",
        species: "Chelonia mydas",
        description:
          "The green sea turtle (Chelonia mydas) is a species of sea turtle in the family Cheloniidae. It is the only species in the genus Chelonia. It is the second-largest hard-shelled sea turtle, after the leatherback sea turtle, and the largest sea turtle in the Atlantic and the eastern Pacific Ocean. It is a diurnal species, and is found in tropical and subtropical seas around the world.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Hawaii_turtle_2.JPG/1200px-Hawaii_turtle_2.JPG",
      },
      {
        id: 2,
        name: "turtle",
        species: "Caretta caretta",
        description:
          "The loggerhead sea turtle (Caretta caretta) is a species of sea turtle in the family Cheloniidae. It is the only species in the genus Caretta. It is the most widely distributed of all hard-shelled sea turtles, with a global range extending from the western Atlantic Ocean to the western Pacific Ocean. It is a diurnal species, and is found in tropical and subtropical seas around the world.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/81/Loggerhead_Sea_Turtle_%28Caretta_caretta%29_2.jpg",
      },
      {
        id: 3,
        name: "turtle",
        species: "Eretmochelys imbricata",
        description:
          "The hawksbill sea turtle (Eretmochelys imbricata) is a species of sea turtle in the family Cheloniidae. It is the only species in the genus Eretmochelys. It is a critically endangered species, with an estimated population of 5,000 to 7,500 mature individuals. It is a diurnal species, and is found in tropical and subtropical seas around the world.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/8b/Tortuga_carey_%28Eretmochelys_imbricata%29%2C_parque_nacional_Ras_Muhammad%2C_Egipto%2C_2022-03-28%2C_DD_56.jpg",
      },
    ],
  },
];

const { width: widthScreen } = Dimensions.get("window");
const Reptil = memo(() => {
  const navigation = useNavigation();

  const data = useRoute().params as {
    reptileSelected: Reptiles;
  };

  const toUseData = StaticData.find(
    (item) => item.reptil === data.reptileSelected
  );

  const handlePress = useCallback(() => {
    navigation.navigate("Home");
  }, []);

  const ref = React.useRef<ICarouselInstance>(null);

  const [id, setId] = useState(0);

  const renderItem: CarouselRenderItem<ReptileCard> = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.cardContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.specie}>{item.species}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity
            onPress={() => {
              Web.openBrowserAsync(item.image);
            }}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
          </TouchableOpacity>
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <Carousel
        defaultIndex={1}
        data={toUseData?.data ?? []}
        renderItem={renderItem}
        width={widthScreen * 0.8}
        style={styles.carouselContainer}
        onSnapToItem={setId}
        // ref={ref}
      />
      <View style={styles.indicatorContainer}>
        {toUseData?.data.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.indicator,
              index === id ? styles.indicatorActive : {},
            ]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.btnBack}>
        <Text style={styles.btnBackTxt}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#b72424",
    marginVertical: 5,
  },
  specie: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
  },
  btnBack: {
    backgroundColor: "#b72424",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: "#b72424",
  },
  btnBackTxt: {
    color: "white",
    fontSize: 18,
  },
});

export default Reptil;
