import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AddItemToOrder = () => {
  const [cat, setCat] = useState("All");

  const cats = [
    "All",
    "Swallow",
    // "Drink",
    "Snacks",
    "Snack3",
    "Snack4",
    "Snack5",
  ];

  return (
    <View>
      <FlatList
        style={{ paddingBottom: 10 }}
        data={cats}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryBtn}>
            <Text
              style={{
                color: item === cat ? Colors.primary : Colors.text,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: 20 }}
        horizontal
      />
    </View>
  );
};

export default AddItemToOrder;

const styles = StyleSheet.create({
  categoryBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
  },
});
