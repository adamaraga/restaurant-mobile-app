import { Colors } from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NumericFormat } from "react-number-format";

const ItemCardAlt = ({ item, data, setData, handleAddItem }: any) => {
  const handleQuantityChange = (type: string, id: string) => {
    if (type === "add") {
      const newData = data.map((item: any) => {
        if (item.id === id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });

      setData(newData);
    } else {
      const newData = data.map((item: any) => {
        if (item.id === id) {
          item.quantity = item.quantity > 0 ? item.quantity - 1 : item.quantity;
        }
        return item;
      });

      setData(newData);
    }
  };

  const handleAddMain = () => {
    if (item.quantity > 0) {
      handleAddItem(item);

      const newData = data.map((itemMain: any) => {
        if (itemMain.id === item.id) {
          itemMain.added = true;
        }
        return itemMain;
      });

      setData(newData);
    }
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.containerLeft}>
        <View style={styles.containerLeftImg}></View>

        <View style={styles.spaceBetween}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.cat}>{item.category}</Text>
          <NumericFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator
            prefix={"₦"}
            renderText={(value) => <Text style={styles.cat}>{value}</Text>}
          />
        </View>
      </View>
      {item?.added ? (
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: Colors.primary }}>Added</Text>
        </View>
      ) : (
        <View style={[styles.spaceBetween, { alignItems: "flex-end" }]}>
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
          <Pressable
            onPress={handleAddMain}
            style={[
              styles.btn,
              {
                backgroundColor:
                  item.quantity > 0 ? Colors.primary : "#5acb213e",
              },
            ]}
          >
            <Text style={{ color: "#fff" }}>ADD</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default ItemCardAlt;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
    height: 95,
  },
  containerLeft: {
    flexDirection: "row",
    columnGap: 20,
  },
  containerLeftImg: {
    width: 80,
    height: "100%",
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textAlt,
  },
  cat: {
    fontSize: 12,
    color: Colors.text,
  },
  containerAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
    padding: 3,
    paddingHorizontal: 5,
    borderRadius: 20,
    height: 35,
    width: 90,
  },
  btn: {
    backgroundColor: Colors.primary,
    color: "#fff",
    borderRadius: 5,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },

  spaceBetween: {
    justifyContent: "space-between",
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
  floatBtnCon: {
    position: "absolute",
    right: 10,
    bottom: 20,
    zIndex: 10,
  },
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
