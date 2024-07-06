import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddOrderModal = ({ setIsVisible }: any) => {
  const [name, setName] = useState("");
  const [seatNum, setSeatNum] = useState("");

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
          paddingTop: 50,
        }}
      >
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => setIsVisible(false)}
        >
          <Text style={{ color: Colors.primary }}>X</Text>
        </TouchableOpacity>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Waiter Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setSeatNum}
            value={seatNum}
            placeholder="Seat Number"
            keyboardType="numeric"
          />
          <View style={styles.btnCon}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={[styles.btn, styles.btnAlt]}
            >
              <Text style={{ color: "#8f0d0d" }}>Cancle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setIsVisible(true)}
            >
              <Text style={{ color: Colors.primary }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddOrderModal;

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

  input: {
    width: "100%",
    height: 50,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderStyle: "solid",
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    position: "relative",
  },

  floatLabel: {
    position: "absolute",
    top: -16,
    left: 10,
    fontSize: 14,
    // color: "#cccccc",
    padding: 3,
    backgroundColor: "#fff",
  },
  btnCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    borderTopStartRadius: 10,
  },

  btn: {
    width: "50%",
    backgroundColor: "#fff",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    color: Colors.primary,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    borderStyle: "solid",
  },

  btnAlt: {
    borderRightWidth: 0,
  },
});
