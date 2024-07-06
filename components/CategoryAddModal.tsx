import { Colors } from "@/constants/Colors";
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

const CategoryAddModal = ({
  setIsVisible,
  edit,
  setCategories,
  editCat,
  categories,
}: any) => {
  const [name, setName] = useState("");
  const [inputError, setInputError] = useState<any>({});
  const db = SQLite.useSQLiteContext();

  const validate = () => {
    let nameError = "";

    if (!name) {
      nameError = "name is required, minimum 2 characters";
    }

    if (nameError) {
      setInputError((curr: any) => {
        return {
          name: nameError,
        };
      });
      return false;
    }
    return true;
  };

  const handleAddCat = () => {
    const checkValidate = validate();
    if (checkValidate) {
      setInputError({});

      db.withTransactionAsync(async () => {
        try {
          if (!edit) {
            const id: any = uuid.v4();
            await db.runAsync(
              "INSERT INTO categories (id, name) values (?, ?)",
              id,
              name
            );
            const data = { id, name };

            setCategories((curr: any) => [...curr, data]);
          } else {
            await db.runAsync(
              "UPDATE categories SET name = ? WHERE id = ?",
              name,
              editCat?.id
            );

            let newCats = categories.map((cat: any) => {
              if (cat.id === editCat?.id) {
                cat.name = name;
              }
              return cat;
            });

            setCategories(newCats);
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
    if (editCat?.name && edit) {
      setName(editCat?.name);
    }
  }, [editCat?.name]);

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
          height: "70%",
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

        <Text style={{ fontWeight: "bold" }}>
          {edit ? "Edit" : "Add"} Category
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
        <TouchableOpacity onPress={handleAddCat} style={styles.btn}>
          <Text style={{ color: "#fff" }}>{edit ? "EDIT" : "ADD"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryAddModal;

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
