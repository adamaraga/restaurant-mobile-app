import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryAddModal from "./CategoryAddModal";

const Categoty = ({
  setMainPage,
  categories,
  setCurrCat,
  setCategories,
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editCat, setEditCat] = useState({});

  const handleCatPress = (cat: any) => {
    setCurrCat(cat);
    setMainPage(true);
  };

  const handleCatEditOpen = (cat: any) => {
    setEditCat(cat);
    setIsVisible(true);
    setEdit(true);
  };

  return (
    <View style={styles.container}>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsVisible(false)}
          visible={isVisible}
        >
          <CategoryAddModal
            setIsVisible={setIsVisible}
            setCategories={setCategories}
            categories={categories}
            edit={edit}
            editCat={editCat}
          />
        </Modal>
        {/* <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsVisible2(false)}
          visible={isVisible2}
        >
          <CategoryAddModal
            edit={true}
            categories={categories}
            setIsVisible={setIsVisible2}
            setCategories={setCategories}
          />
        </Modal> */}
      </View>
      <View>
        <Text style={{ marginBottom: 20 }}>Select a Category</Text>
      </View>

      <ScrollView>
        {categories.length < 1 ? (
          <Text
            style={{ textAlign: "center", marginTop: 50, color: "#bababa" }}
          >
            No category found
          </Text>
        ) : (
          <View style={styles.catCon}>
            {categories.map((category: any) => {
              return (
                <TouchableOpacity
                  style={styles.catItem}
                  onLongPress={() => handleCatEditOpen(category)}
                  onPress={() => handleCatPress(category)}
                  key={category?.id}
                >
                  <Text style={{ fontSize: 15 }}>{category?.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.floatBtnCon}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
            setEdit(false);
          }}
          style={styles.floatBtn}
        >
          <Text style={{ fontSize: 20, color: Colors.primary }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categoty;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: "relative",
    height: "100%",
    // paddingBottom: 70,
  },
  catCon: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 25,
    paddingBottom: 20,
  },

  catItem: {
    backgroundColor: "#fff",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // flex: 1,
    flexBasis: "47%",
  },

  floatBtnCon: {
    position: "absolute",
    right: 10,
    bottom: 20,
  },

  floatBtn: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
  },
});
