import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { addCardToDeck } from "../utils/api";
import { addCard } from "../actions/index";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleAddQuestion = (question) => {
    this.setState({
      question,
    });
  };

  handleAddAnswer = (answer) => {
    this.setState({
      answer,
    });
  };
  handleSubmitQuestion = (e) => {
    e.preventDefault();
    const { route, navigation } = this.props;
    const title = this.props.route.params.title;

    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };

    this.props.dispatch(addCard(card, title));

    addCardToDeck(card, title);

    this.setState({
      question: "",
      answer: "",
    });
    navigation.goBack();
  };
  render() {
    const { question, answer } = this.state;

    return (
      <View style={{ paddingTop: 70 }}>
        <Text style={styles.TextStyle}>Add Question to Deck</Text>
        <View style={{ margin: 14 }}>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.textInput}
              onChangeText={this.handleAddQuestion}
              value={question}
              placeholder="Type your question"
            />
          </KeyboardAvoidingView>
          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            onChangeText={this.handleAddAnswer}
            value={answer}
            placeholder="Type the answer"
          />
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={this.handleSubmitQuestion}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>
                Submit Question
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state, { route }) {
  const { deckId } = route.params;
  return {
    title: deckId,
  };
}

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  TextStyle: {
    color: "#324A59",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    alignSelf: "center",
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 6,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#324A59",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  submitBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#324A59",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
