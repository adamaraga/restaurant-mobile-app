import { Colors } from "@/constants/Colors";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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
import { NumericFormat } from "react-number-format";
import ItemCard from "./ItemCard";
import ItemCardAlt from "./ItemCardAlt";
import AddOrderModal from "./AddOrderModal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated from "react-native-reanimated";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import SwipeRow from "./SwipeRow";

const AddOrder = ({ setcurrView, edit }: any) => {
  const [addPage, setAddPage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([
    // {
    //   id: "23432",
    //   name: "Chocolate Donut",
    //   category: "Snack",
    //   price: 500,
    //   vat: 50,
    //   total: 550,
    //   quantity: 0,
    // },
    {
      id: "1",
      name: "Fried rice",
      category: "Snack",
      price: 2000,
      quantity: 0,
    },
    { id: "2", name: "Beans", category: "Snack", price: 2000, quantity: 0 },
    { id: "3", name: "Plantain", category: "Snack", price: 2000, quantity: 0 },
    { id: "4", name: "Tea", category: "Snack", price: 2000, quantity: 0 },
    { id: "5", name: "Fish", category: "Snack", price: 2000, quantity: 0 },
    { id: "6", name: "Meat", category: "Snack", price: 2000, quantity: 0 },
    { id: "7", name: "Meat", category: "Snack", price: 2000, quantity: 0 },
    { id: "8", name: "Meat", category: "Snack", price: 2000, quantity: 0 },
    { id: "9", name: "Meat", category: "Snack", price: 2000, quantity: 0 },
  ]);

  const [items, setItems] = useState<any>([
    // { id: 1, name: "Fried rice", price: 2000, quantity: 4 },
    // { id: 2, name: "Beans", price: 2000, quantity: 4 },
    // { id: 3, name: "Plantain", price: 2000, quantity: 4 },
    // { id: 4, name: "Tea", price: 2000, quantity: 4 },
    // { id: 5, name: "Fish", price: 2000, quantity: 4 },
    // { id: 6, name: "Meat", price: 2000, quantity: 4 },
  ]);

  const categories = [
    "All",
    "Swallow",
    "Local Drink",
    "Snack",
    "Tea",
    "Protein",
    "Rice",
  ];

  const handleAddItem = (item: any) => {
    setItems([...items, item]);
  };

  const handleRemoveAdded = (id: string) => {
    const newData = data.map((item: any) => {
      if (item.id === id) {
        item.added = false;
      }
      return item;
    });
    setData(newData);
  };

  useEffect(() => {
    if (items.length > 0) {
      let sum = 0;
      // calculate sum using forEach() method
      items.forEach((item: any) => {
        sum += item.price * item.quantity;
      });

      setTotalPrice(sum);
    } else setTotalPrice(0);
  }, [items.length]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <AddOrderModal setIsVisible={setIsVisible} />
      </Modal>
      {!addPage ? (
        <ScrollView>
          <View style={styles.topCon}>
            <Pressable
              onPress={() => setcurrView("main")}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color={Colors.primary}
              />

              <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                Orders
              </Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => setAddPage(true)}
              style={styles.addBtn}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 20,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.topCon}>
            {/* <View style={styles.itemsNo}> */}
            <Text style={{ color: Colors.text }}>Items: {items.length}</Text>
            {/* </View> */}
            <NumericFormat
              value={totalPrice}
              displayType={"text"}
              thousandSeparator
              prefix={"₦"}
              renderText={(value) => (
                <Text style={{ color: Colors.text }}>{value}</Text>
              )}
            />
          </View>

          <ScrollView style={{ height: 470 }}>
            <GestureHandlerRootView>
              {items.map((item: any) => {
                return (
                  <SwipeRow
                    key={item?.id}
                    item={item}
                    items={items}
                    setItems={setItems}
                    handleRemoveAdded={handleRemoveAdded}
                  />
                );
              })}
            </GestureHandlerRootView>
          </ScrollView>

          <View style={styles.btnCon}>
            <TouchableOpacity
              onPress={() => setcurrView("main")}
              style={[styles.btn, styles.btnAlt]}
            >
              <Text style={{ color: "#8f0d0d" }}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => items.length > 0 && setIsVisible(true)}
            >
              <Text style={{ color: Colors.primary }}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View>
          <Pressable
            onPress={() => setAddPage(false)}
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <MaterialIcons
              name="keyboard-backspace"
              size={24}
              color={Colors.primary}
            />

            <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
              Back
            </Text>
          </Pressable>
          <FlatList
            style={{ height: 45, marginBottom: 10 }}
            data={categories}
            ListHeaderComponent={<View></View>}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 8,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: Colors.text }}>{item}</Text>
              </View>
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={{ columnGap: 10 }}
            horizontal
          />
          <FlatList
            data={data}
            style={{ marginBottom: 210 }}
            // ListHeaderComponent={
            //   <View>

            //   </View>
            // }
            renderItem={({ item }) => (
              <ItemCardAlt
                item={item}
                data={data}
                setData={setData}
                handleAddItem={handleAddItem}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: 20 }}
          />
        </View>
      )}
    </View>
  );
};

export default AddOrder;

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  topCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  btnCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    borderTopStartRadius: 10,
  },

  btn: {
    width: "50%",
    backgroundColor: "#fff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    color: Colors.primary,
  },

  btnAlt: {
    borderRightColor: "#e4e4e4",
    borderRightWidth: 1,
    borderStyle: "solid",
  },
});
