import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as SQLite from "expo-sqlite";
import uuid from "react-native-uuid";

const ItemAddModal = ({
  setIsVisible,
  edit,
  categories,
  items,
  setItems,
  editItem,
}: any) => {
  const [name, setName] = useState("");
  const [cat, setCat] = useState<any>({});
  const [price, setPrice] = useState<any>("");
  const [inputError, setInputError] = useState<any>({});
  const db = SQLite.useSQLiteContext();

  const validate = () => {
    let nameError = "";
    let priceError = "";
    let catError = "";

    if (!name) {
      nameError = "name is required, minimum 2 characters";
    }
    if (edit ? !cat : !cat?.name) {
      catError = "category is required, minimum 2 characters";
    }
    if (!price) {
      priceError = "price is required, minimum 2 characters";
    }

    if (nameError || priceError || catError) {
      setInputError((curr: any) => {
        return {
          ...curr,
          name: nameError,
          cat: catError,
          price: priceError,
        };
      });
      return false;
    }
    return true;
  };

  const handleAddItems = () => {
    const checkValidate = validate();
    if (checkValidate) {
      setInputError({});

      db.withTransactionAsync(async () => {
        try {
          if (!edit) {
            const id: any = uuid.v4();
            const vat = parseInt(price) * 0.075;
            const total = parseInt(price) + vat;
            const category = cat?.name;
            const categoryId = cat?.id;

            await db.runAsync(
              "INSERT INTO items (id, name, price, vat, total, category, categoryId) values (?, ?, ?, ?, ?, ?, ?)",
              id,
              name,
              parseInt(price),
              vat,
              total,
              category,
              categoryId
            );
            const data = {
              id,
              name,
              price: parseInt(price),
              vat,
              total,
              category,
              categoryId,
            };

            setItems((curr: any) => [...curr, data]);
          } else {
            const vat = parseInt(price) * 0.075;
            const total = parseInt(price) + vat;
            const categoryId = cat;
            const categoryFil = categories?.filter(
              (c: any) => c.id === categoryId
            );
            const category = categoryFil?.[0].name;

            await db.runAsync(
              "UPDATE items SET name = ?, price= ?, vat= ?, total= ?, category= ?, categoryId= ? WHERE id = ?",
              name,
              parseInt(price),
              vat,
              total,
              category,
              categoryId,
              editItem?.id
            );

            let newItems = items.map((item: any) => {
              if (item.id === editItem?.id) {
                item.name = name;
                item.price = parseInt(price);
                item.vat = vat;
                item.total = total;
                item.category = category;
                item.categoryId = categoryId;
              }
              return item;
            });
            setItems(newItems);
          }

          setIsVisible(false);
        } catch (error) {
          console.log("error", error);
        }
      });

      // setLoading(false);
    }
  };

  useEffect(() => {
    if (editItem?.name && edit) {
      setName(editItem?.name);
      setPrice(editItem?.price?.toString());
      setCat(editItem?.categoryId);
    }
  }, [editItem?.name]);

  return (
    <View
      style={{
        backgroundColor: "#0000009c",
        height: "100%",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          height: "80%",
          backgroundColor: "#fff",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
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

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {edit ? "Edit" : "Add"} Item
        </Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: inputError?.name ? Colors.error : Colors.input },
          ]}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />

        <TextInput
          style={[
            styles.input,
            { borderColor: inputError?.price ? Colors.error : Colors.input },
          ]}
          onChangeText={setPrice}
          value={price}
          placeholder="Price"
          keyboardType="numeric"
        />

        <View
          style={{
            borderColor: inputError?.cat ? Colors.error : Colors.input,
            borderWidth: 1,
            borderStyle: "solid",
            marginTop: 30,
            borderRadius: 10,
          }}
        >
          <Picker
            onValueChange={(itemValue, itemIndex) => setCat(itemValue)}
            selectedValue={cat}
          >
            <Picker.Item label="select category" value={{}} />
            {categories.map((cat: any) => {
              return (
                <Picker.Item
                  key={cat.id}
                  label={cat.name}
                  value={edit ? cat.id : cat}
                />
              );
            })}
          </Picker>
        </View>

        <TouchableOpacity onPress={handleAddItems} style={styles.btn}>
          <Text style={{ color: "#fff" }}>{edit ? "EDIT" : "ADD"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemAddModal;

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
    marginTop: 30,
    borderRadius: 10,
    paddingHorizontal: 20,
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
});
