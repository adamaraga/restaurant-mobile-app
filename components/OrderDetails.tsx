import { Colors } from "@/constants/Colors";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
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

const OrderDetails = ({ setcurrView, edit }: any) => {
  const [addPage, setAddPage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([
    {
      id: "23432",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "32323",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "23444532",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "3483434",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "901231",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "32902231",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "230123901",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "232324",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
    {
      id: "343493",
      name: "Chocolate Donut",
      category: "Snack",
      price: 500,
      vat: 50,
      total: 550,
      quantity: 0,
    },
  ]);

  const [items, setItems] = useState([
    { id: 1, name: "Fried rice", price: 2000, quantity: 4 },
    { id: 2, name: "Beans", price: 2000, quantity: 4 },
    { id: 3, name: "Plantain", price: 2000, quantity: 4 },
    { id: 4, name: "Tea", price: 2000, quantity: 4 },
    { id: 5, name: "Fish", price: 2000, quantity: 4 },
    { id: 6, name: "Meat", price: 2000, quantity: 4 },
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

  return (
    <View>
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
        </View>

        <View style={styles.topCon}>
          <Text style={{ color: Colors.text }}>Waiter: John Deo</Text>
          <Text style={{ color: Colors.text }}>Seat No: 7</Text>
        </View>

        <View style={styles.topCon}>
          <Text style={{ color: Colors.text }}>Items: {items.length}</Text>
          <NumericFormat
            value={14000}
            displayType={"text"}
            thousandSeparator
            prefix={"₦"}
            renderText={(value) => (
              <Text style={{ color: Colors.text }}>{value}</Text>
            )}
          />
        </View>

        {items.map((item) => {
          return (
            <View style={styles.itemCon} key={item.name}>
              <View style={styles.itemTop}>
                <Text>{item.name}</Text>

                <Text style={{ color: Colors.text }}>{item.quantity}</Text>
              </View>
              <View style={styles.itemTop}>
                <NumericFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator
                  prefix={"₦"}
                  renderText={(value) => (
                    <Text style={{ color: Colors.text }}>{value}</Text>
                  )}
                />
                <NumericFormat
                  value={item.price * item.quantity}
                  displayType={"text"}
                  thousandSeparator
                  prefix={"₦"}
                  renderText={(value) => (
                    <Text style={{ color: Colors.text }}>{value}</Text>
                  )}
                />
              </View>
            </View>
          );
        })}

        {/* <View style={styles.btnCon}>
          <TouchableOpacity
            onPress={() => setcurrView("main")}
            style={[styles.btn, styles.btnAlt]}
          >
            <Text style={{ color: "#8f0d0d" }}>Cancle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsVisible(true)}
          >
            <Text style={{ color: Colors.primary }}>Proceed</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

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

  itemsNo: {
    color: Colors.text,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.text,
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },

  itemCon: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    gap: 15,
    padding: 10,
  },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
