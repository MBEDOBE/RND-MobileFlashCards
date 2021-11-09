import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { addDeck } from "../actions/index";

class AddDeck extends Component {
  state = {
    deckName: "",
  };

  handleTextChanged = (deckName) => {
    this.setState({
      deckName,
    });
  };

  submitDeck = () => {
    const { addDeck, navigation } = this.props;
    const { deckName } = this.state;
    const deck = {
      title: deckName,
      questions: [],
    };
    addDeck(deck);
    this.setState(() => ({ deckName: "" }));
    navigation.goBack();
  };
  render() {
    const { deckName } = this.state;
    return (
      <View style={{ padding: 25, paddingTop: 80, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <Text
            style={{
              color: "#324A59",
              fontSize: 25,
              fontWeight: "700",
              marginBottom: 50,
              alignSelf: "center",
            }}
          >
            What is the Title of your deck?
          </Text>
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={this.handleTextChanged}
              value={deckName}
              placeholder="Type the deck title"
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={this.submitDeck}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>
                Create New Deck
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: "100%",
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
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default connect(null, { addDeck })(AddDeck);
