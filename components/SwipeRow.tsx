import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { NumericFormat } from "react-number-format";

const SwipeRow = ({ items, setItems, item, handleRemoveAdded }: any) => {
  const onSwipeableWillOpen = (id: any) => {
    const newItems = items.filter((item: any) => item.id !== id);

    setItems(newItems);

    handleRemoveAdded(id);
  };

  const handleQuantityChange = (type: string, id: string) => {
    if (type === "add") {
      const newItems = items.map((item: any) => {
        if (item.id === id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });

      setItems(newItems);
    } else {
      const newItems = items.map((item: any) => {
        if (item.id === id) {
          item.quantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
        }
        return item;
      });

      setItems(newItems);
    }
  };

  const renderActions = () => {
    return (
      <Pressable
        onPress={() => onSwipeableWillOpen(item.id)}
        style={{
          width: 50,
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome5 name="trash" size={15} color="#FF165D" />
      </Pressable>
    );
  };
  return (
    <Swipeable
      // onSwipeableOpen={() => onSwipeableWillOpen(item.id)}
      renderRightActions={renderActions}
      renderLeftActions={renderActions}
      key={item.id}
    >
      <View style={styles.itemCon} key={item.name}>
        <View style={styles.itemTop}>
          <Text>{item.name}</Text>
          <View style={styles.containerAmount}>
            <TouchableOpacity
              onPress={() => handleQuantityChange("add", item.id)}
              style={styles.amountBtn}
            >
              <Text style={styles.amountBtnText}>+</Text>
            </TouchableOpacity>
            <Text style={{ color: Colors.text }}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => handleQuantityChange("minus", item.id)}
              style={styles.amountBtn}
            >
              <Text style={styles.amountBtnText}>-</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={{ color: Colors.text }}>{item.quantity}</Text> */}
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
    </Swipeable>
  );
};

export default SwipeRow;

const styles = StyleSheet.create({
  topCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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

  containerAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 3,
    borderRadius: 20,
    width: 80,
    height: 35,
  },
  amountBtn: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  amountBtnText: {
    position: "relative",
    top: -2,
  },
});
