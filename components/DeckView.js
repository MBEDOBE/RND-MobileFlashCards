import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { removeDeck } from "../actions/index";
import { removeEntry } from "../utils/api";
class DeckView extends Component {
  handleDelete = () => {
    console.log("title", this.props.title);
    const id = this.props.title;
    this.props.dispatch(removeDeck(id));
    removeEntry(id);
    this.props.navigation.goBack();
  };
  render() {
    const { title, questions, navigation } = this.props;
    console.log("deck info", title);
    return (
      <View style={styles.container}>
        {questions.length === 0 ? (
          <View>
            <Text
              style={{ color: "#324A59", fontSize: 15, fontWeight: "bold" }}
            >
              Please add a card before you can start the quiz!
            </Text>
          </View>
        ) : null}
        <Text style={styles.header}>{title}</Text>
        <Text style={{ color: "#324A59", fontSize: 25, marginBottom: 30 }}>
          {questions.length} Question(s)
        </Text>

        <View style={styles.outlineBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddCard", { title: title })}
          >
            <Text style={styles.btnText}>Add Question</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Quiz", { title: title })}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitBtn}>
          <TouchableOpacity onPress={this.handleDelete}>
            <Text style={[styles.btnText, { color: "#fff" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
  },
  submitBtn: {
    width: "80%",
    height: 50,
    backgroundColor: "#324A59",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 25,
  },
  outlineBtn: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#324A59",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 0,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    color: "#324A59",
    fontSize: 45,
    fontWeight: "700",
    marginBottom: 20,
  },
});
function mapStateToProps({ decks }, { route }) {
  const { title } = route.params;
  return {
    title,
    questions: decks[title].questions,
  };
}

export default connect(mapStateToProps)(DeckView);
