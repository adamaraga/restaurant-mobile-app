import { Tabs } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.icon,
        tabBarStyle: {
          backgroundColor: Colors.backgroundAlt,
          borderTopWidth: 0,
        },
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.backgroundAlt,
        },
        tabBarIconStyle: {
          color: Colors.icon,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menu",
          headerTitleStyle: {
            color: Colors.textAlt,
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          headerTitleStyle: {
            color: Colors.textAlt,
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="fastfood" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="category"
        options={{
          headerTitleStyle: {
            color: Colors.textAlt,
          },
          title: "Category",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="category" size={24} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="bill"
        options={{
          title: "Bill",
          headerTitleStyle: {
            color: Colors.textAlt,
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="insert-drive-file" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          headerTitleStyle: {
            color: Colors.textAlt,
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="report" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
