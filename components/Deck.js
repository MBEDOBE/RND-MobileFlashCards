import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Deck(props) {
  const { deck } = props;
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{deck.title}</Text>
      <Text style={[styles.text, { fontSize: 15, color: "#c4c4c4" }]}>
        {deck.questions.length} Question(s)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "#324A59",
    fontWeight: "bold",
    fontSize: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
});

export default Deck;
