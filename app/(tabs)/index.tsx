import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import stylesPage from "../../assets/styles/main.style";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import Categoty from "@/components/Categoty";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ItemAddModal from "@/components/ItemAddModal";
import SearchBar from "@/components/SearchBar";
import * as SQLite from "expo-sqlite";

export default function HomeScreen() {
  const db = SQLite.useSQLiteContext();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [mainPage, setMainPage] = useState(false);
  const [currCat, setCurrCat] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [editItem, setEditItem] = useState<any>({});
  const [items, setItems] = useState<any>([]);
  const [itemsFil, setItemsFil] = useState<any>([]);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      try {
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS categories (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255) NOT NULL)"
        );
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS items (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255) NOT NULL, price INTEGER NOT NULL, vat INTEGER NOT NULL, total INTEGER NOT NULL, category VARCHAR(255), categoryId VARCHAR(36), FOREIGN KEY (categoryId) REFERENCES categories(id) )"
        );

        const categories = await db.getAllAsync("SELECT * FROM categories");
        setCategories(categories);

        const items = await db.getAllAsync("SELECT * FROM items");
        setItems(items);
      } catch (error) {
        console.log("error", error);
      }
    });

    setLoading(false);
  }, [db]);

  // const handleSearch = () => {
  //   db.withTransactionAsync(async () => {
  //     try {
  //       if (query.length > 0) {
  //         const items = await db.getAllAsync(
  //           "SELECT * FROM items WHERE name LIKE ?",
  //           `%${query}%`
  //         );

  //         setItemsFil(items);
  //         // console.log("items", items);
  //       } else {
  //         const items = await db.getAllAsync("SELECT * FROM items");
  //         setItems(items);
  //         // setRefresh((curr) => !curr);
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   });
  // };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (query.length > 0) {
          const items = await db.getAllAsync(
            "SELECT * FROM items WHERE name LIKE ?",
            `%${query}%`
          );

          setItemsFil(items);
        }
        if (query.length === 0) {
          setRefresh((curr) => !curr);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    handleSearch();
  }, [query]);

  useEffect(() => {
    if (currCat?.id) {
      const filteredItems = items.filter(
        (item: any) => item.categoryId === currCat?.id
      );

      setItemsFil(filteredItems);
    }
  }, [currCat?.name, currCat?.id, refresh]);

  return (
    <SafeAreaView style={stylesPage.containerMain}>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <ItemAddModal
          categories={categories}
          setIsVisible={setIsVisible}
          items={items}
          setItems={setItems}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisibleEdit(false)}
        visible={isVisibleEdit}
      >
        <ItemAddModal
          categories={categories}
          edit={true}
          editItem={editItem}
          items={items}
          setItems={setItems}
          setIsVisible={setIsVisibleEdit}
        />
      </Modal>

      {!mainPage ? (
        <Categoty
          setMainPage={setMainPage}
          setCurrCat={setCurrCat}
          categories={categories}
          setCategories={setCategories}
        />
      ) : (
        <View style={{ height: "100%" }}>
          <View style={styles.floatBtnCon}>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={styles.floatBtn}
            >
              <Text style={{ fontSize: 20, color: Colors.primary }}>+</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={itemsFil}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <View
                style={{
                  backgroundColor: Colors.background,
                  paddingBottom: 10,
                  zIndex: 2,
                }}
              >
                <View style={styles.catCon}>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={styles.catBtn}
                      onPress={() => setMainPage(false)}
                    >
                      <Text style={{ fontSize: 16 }}>Categories</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.pickerCon}>
                    <Picker
                      style={{ backgroundColor: "#fff" }}
                      selectedValue={currCat}
                      onValueChange={(itemValue, itemIndex) =>
                        setCurrCat(itemValue)
                      }
                    >
                      {categories.map((cat: any) => {
                        return (
                          <Picker.Item
                            key={cat.id}
                            label={cat.name}
                            value={cat}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                </View>
                <SearchBar
                  // handleSearch={handleSearch}
                  query={query}
                  setQuery={setQuery}
                />
              </View>
            }
            renderItem={({ item }) => (
              <ItemCard
                item={item}
                setIsVisibleEdit={setIsVisibleEdit}
                setEditItem={setEditItem}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: 20 }}
          />
        </View>
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  catCon: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  catBtn: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  floatBtnCon: {
    position: "absolute",
    right: 10,
    bottom: 20,
    zIndex: 10,
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

  pickerCon: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 4,
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingLeft: 50,
    marginBottom: 10,
  },
});
