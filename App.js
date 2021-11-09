import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "react-native-gesture-handler";

import { View, Platform, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import middleware from "./middleware";
import reducer from "./reducers";

import Decks from "./components/Decks";
import DeckView from "./components/DeckView";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helpers";

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackNavigatorConfig = {
  headerMode: "screen",
};

//the tabs on screen
const RouteConfigs = {
  Decks: {
    name: "Decks",
    component: Decks,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name="ios-bookmarks"
          size={30}
          color={tintColor}
          paddingBottom={50}
        />
      ),
      title: "Decks",
    },
  },
  AddDeck: {
    name: "Add Deck",
    component: AddDeck,
    options: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome
          name="plus-square"
          size={30}
          color={tintColor}
          paddingBottom={50}
        />
      ),
      title: "Add Deck",
    },
  },
};

//setup of the tabs e.g. styling
const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: '#324A59',
    style: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      borderRadius: 16,
      height: Platform.OS === "ios" ? 100 : 80,
      shadowColor: "#324A59",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    labelStyle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3,
    },
    showIcon: true,
  },
};


const TabNav = () => (
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs["Decks"]} />
    <Tab.Screen {...RouteConfigs["AddDeck"]} />
  </Tab.Navigator>
);


const StackConfig = {
  TabNav: {
    name: "Home",
    component: TabNav,
    options: { headerShown: false },
  },
  DeckView: {
    name: "DeckView",
    component: DeckView,
    options: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: "#324A59",
      },
      title: "Deck View",
    },
  },
  AddCard: {
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#324A59',
      },
      title: "Add Card",
    },
  },
  Quiz: {
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#324A59',
      },
      title: "Quiz",
    },
  },
};

const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig["TabNav"]} />
    <Stack.Screen {...StackConfig["DeckView"]} />
    <Stack.Screen {...StackConfig["AddCard"]} />
    <Stack.Screen {...StackConfig["Quiz"]} />
  </Stack.Navigator>
);

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    const store = createStore(reducer, middleware);
    
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: '#cdcdcd' }}>
          <FlashcardStatusBar
            backgroundColor="#324A59"
            barStyle="light-content"
          />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
