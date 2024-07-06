import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BtnsModal = ({ setIsVisibleBtns, setcurrView, currStatus }: any) => {
  return (
    <View
      style={{
        backgroundColor: "#0000009c",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "95%",
          backgroundColor: "#fff",
          borderRadius: 20,
          position: "relative",
          padding: 20,
          paddingTop: 70,
        }}
      >
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => setIsVisibleBtns(false)}
        >
          <Text style={{ color: Colors.primary }}>X</Text>
        </TouchableOpacity>

        <View>
          {currStatus === "Pending" && (
            <TouchableOpacity
              style={styles.btn}
              // onPress={() => {
              //   setcurrView("details"), setIsVisibleBtns(false);
              // }}
            >
              <Text style={{ color: Colors.text, fontWeight: "bold" }}>
                Pay
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setcurrView("details"), setIsVisibleBtns(false);
            }}
          >
            <Text style={{ color: Colors.text, fontWeight: "bold" }}>
              Veiw More Detail
            </Text>
          </TouchableOpacity>

          {currStatus === "Pending" && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setcurrView("edit"), setIsVisibleBtns(false);
              }}
            >
              <Text style={{ color: Colors.text, fontWeight: "bold" }}>
                Edit Order
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btn}
            onPress={() => console.log("Print")}
          >
            <Text style={{ color: Colors.text, fontWeight: "bold" }}>
              Print
            </Text>
          </TouchableOpacity>

          {currStatus === "Pending" && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => console.log("Delete")}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default BtnsModal;

const styles = StyleSheet.create({
  floatBtnCon: {
    position: "absolute",
    right: 10,
    bottom: -40,
  },

  floatBtn: {
    position: "absolute",
    right: 10,
    top: 15,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderStyle: "solid",
  },

  btn: {
    borderColor: "#cccccc",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
