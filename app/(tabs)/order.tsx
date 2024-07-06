import { Colors } from "@/constants/Colors";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import stylesPage from "../../assets/styles/main.style";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import FilterModal from "@/components/FilterModal";
import AddOrder from "@/components/AddOrder";
import BtnsModal from "@/components/BtnsModal";
import OrderDetails from "@/components/OrderDetails";

const Order = () => {
  const [currStatus, setCurrStatus] = useState("Pending");
  const [data, setData] = useState([
    {
      id: "23432",
      waiter: "John Doe",
      seatNo: 6,
      no: 4,
      price: 10000,
      createdAt: "24/6/2015 10:10 am",
      status: "Pending",
    },
    {
      id: "6747236 ",
      waiter: "John Doe",
      seatNo: 6,
      no: 4,
      price: 10000,
      createdAt: "24/6/2015 10:10 am",
      status: "Paid",
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleBtns, setIsVisibleBtns] = useState(false);
  const [currView, setcurrView] = useState("main");

  return (
    <SafeAreaView style={stylesPage.containerMain}>
      {currView === "main" && (
        <View style={{ height: "100%" }}>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsVisible(false)}
            visible={isVisible}
          >
            <FilterModal setIsVisible={setIsVisible} />
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsVisibleBtns(false)}
            visible={isVisibleBtns}
          >
            <BtnsModal
              setIsVisibleBtns={setIsVisibleBtns}
              setcurrView={setcurrView}
              currStatus={currStatus}
            />
          </Modal>
          <View style={styles.floatBtnCon}>
            <TouchableOpacity
              onPress={() => setcurrView("add")}
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
          <FlatList
            data={data}
            ListHeaderComponent={
              <View>
                <View style={styles.topCon}>
                  <TouchableOpacity
                    style={styles.filterBtn}
                    onPress={() => setIsVisible(true)}
                  >
                    <MaterialIcons
                      name="filter-list"
                      size={24}
                      color={Colors.primary}
                    />
                    <Text>All</Text>
                  </TouchableOpacity>

                  <SearchBar width="60%" />
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <Pressable
                onLongPress={() => {
                  setIsVisibleBtns(true);
                  setCurrStatus(item.status);
                }}
                style={styles.itemCon}
              >
                <View style={styles.itemTop}>
                  <Text style={{ fontWeight: "bold", color: Colors.textAlt }}>
                    {item.waiter} ({item.seatNo})
                  </Text>
                  {/* <Text style={{ color: Colors.text }}>{item.seatNo}</Text> */}
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ color: Colors.text }}>{item.createdAt}</Text>
                  </View>
                </View>
                <View style={styles.itemBottom}>
                  <View>
                    <Text style={{ color: Colors.text }}>Items: {item.no}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color:
                          item.status === "Paid" ? Colors.primary : "#d4b331",
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <NumericFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator
                    prefix={"₦"}
                    renderText={(value) => (
                      <Text style={{ color: Colors.text }}>{value}</Text>
                    )}
                  />
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ rowGap: 10 }}
          />
        </View>
      )}

      {currView === "add" && <AddOrder setcurrView={setcurrView} />}
      {currView === "edit" && (
        <AddOrder setcurrView={setcurrView} edit={true} />
      )}
      {currView === "details" && <OrderDetails setcurrView={setcurrView} />}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  topCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  floatBtnCon: {
    position: "absolute",
    right: 10,
    bottom: 20,
    zIndex: 10,
  },
  filterBtn: {
    width: "37%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  addBtn: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#000",
  },
  itemCon: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 20,
  },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noCon: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.text,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
