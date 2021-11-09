import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import { handleInitialData } from "../actions/index";

class Decks extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { questions, decks, navigation } = this.props;
    // console.log('decks', this.props.decks)
    return (
      <ScrollView style={styles.container}>
        {decks &&
          Object.values(decks).map((deck) => {
            return (
              <TouchableOpacity
                key={deck.title}
                onPress={() =>
                  navigation.navigate("DeckView", { title: deck.title })
                }
              >
                {}
                <Deck deck={deck} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#324A59',
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20,
  },
});

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}
export default connect(mapStateToProps)(Decks);
