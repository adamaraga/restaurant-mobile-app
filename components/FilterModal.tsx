import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const FilterModal = ({ setIsVisible }: any) => {
  const [showdate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState("");
  const [showdateTo, setShowDateTo] = useState(false);
  const [dateTo, setDateTo] = useState(new Date());
  const [dateStringTo, setDateStringTo] = useState("");

  const onChange = (event: any, selectedDate: any) => {
    setShowDate(false);

    setDateString(moment(selectedDate).format("YYYY-MM-DD"));
    setDate(selectedDate);
  };
  const onChangeTo = (event: any, selectedDate: any) => {
    setShowDateTo(false);

    setDateStringTo(moment(selectedDate).format("YYYY-MM-DD"));
    setDateTo(selectedDate);
  };

  const status = ["All", "Paid", "Pending"];

  // useEffect(() => {
  //   setShowDate(false);
  // }, [date]);

  // useEffect(() => {
  //   setShowDateTo(false);
  // }, [dateTo]);
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
          paddingTop: 40,
        }}
      >
        <TouchableOpacity
          style={styles.floatBtn}
          onPress={() => setIsVisible(false)}
        >
          <Text style={{ color: Colors.primary }}>X</Text>
        </TouchableOpacity>

        <View>
          <View
            style={{
              borderColor: "#cccccc",
              borderWidth: 1,
              borderStyle: "solid",
              marginTop: 30,
              borderRadius: 10,
            }}
          >
            <Picker

            // selectedValue={currCat}
            // onValueChange={(itemValue, itemIndex) => setCurrCat(itemValue)}
            >
              <Picker.Item label="select category" value="" />
              {status.map((item: any) => {
                return <Picker.Item key={item} label={item} value={item} />;
              })}
            </Picker>
          </View>

          <Pressable style={styles.input} onPress={() => setShowDate(true)}>
            <MaterialIcons name="date-range" size={24} color={Colors.primary} />
            <Text style={styles.floatLabel}>From</Text>
            <Text>{dateString}</Text>
          </Pressable>
          {showdate && (
            <DateTimePicker
              display="default"
              value={date}
              mode={"date"}
              onChange={onChange}
            />
          )}

          <Pressable style={styles.input} onPress={() => setShowDateTo(true)}>
            <MaterialIcons name="date-range" size={24} color={Colors.primary} />
            <Text style={styles.floatLabel}>To</Text>
            <Text>{dateStringTo}</Text>
          </Pressable>
          {showdateTo && (
            <DateTimePicker
              display="default"
              value={dateTo}
              mode={"date"}
              onChange={onChangeTo}
            />
          )}

          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: "#fff" }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FilterModal;

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

  btn: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
});
