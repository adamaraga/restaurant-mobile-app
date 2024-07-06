import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({ width, query, setQuery, handleSearch }: any) => {
  return (
    <View style={{ position: "relative", width: width ? width : "100%" }}>
      <MaterialIcons
        style={{
          position: "absolute",
          zIndex: 2,
          left: 10,
          top: 14,
        }}
        name="search"
        size={24}
        color={Colors.primary}
      />

      <TextInput
        style={styles.input}
        onChangeText={setQuery}
        value={query}
        placeholder="Search"
        // onEndEditing={handleSearch}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingLeft: 50,
    // marginBottom: 10,
  },
});
