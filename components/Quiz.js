import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";

const screen = {
  QUESTION: "question",
  ANSWER: "answer",
  RESULT: "result",
};
const answer = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
};

export class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
  };
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    page: 0,
    numQuestions: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0),
  };

  handlePageChange = () => {
    this.setState({
      show: screen.QUESTION,
    });
  };
  handleAnswerQuestion = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState((prevState) => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState((prevState) => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      (prevState) => ({
        answered: prevState.answered.map((val, idx) =>
          page === idx ? 1 : val
        ),
      }),
      () => {
        const { correct, incorrect, numQuestions } = this.state;

        if (numQuestions === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          this.setState((prevState) => ({
            show: screen.QUESTION,
          }));
        }
      }
    );
  };
  handleRestart = () => {
    this.setState((prevState) => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questions).fill(0),
    }));
  };
  render() {
    const { deck, navigation } = this.props;
    const { questions } = deck;
    const { show } = this.state;

    //no cards view
    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: "center" }]}>
              You cannot take the quiz now. Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }
    //result screen view
    if (this.state.show === screen.RESULT) {
      const { correct, numQuestions } = this.state;

      const percentage = ((correct / numQuestions) * 100).toFixed(0);
      const resultStyle = percentage >= 60 ? styles.pass : styles.fail;

      return (
        <View style={styles.container}>
          <View style={styles.block}>
            <Text
              style={[styles.count, { textAlign: "center", marginTop: "50%" }]}
            >
              Quiz Complete!
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={resultStyle}>You got {percentage}% correct</Text>
          </View>
          <View style={{ marginLeft: 40, marginRight: 40 }}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={this.handleRestart}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>
                Restart Quiz
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={[styles.btnText, { color: "#000" }]}>
                Back to Deck
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <Swiper
        paginationStyle={{ position: "absolute", top: 30, bottom: undefined }}
        onMomentumScrollBegin={this.handlePageChange}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? "Question" : "Answer"}
              </Text>
              <View style={styles.questionBox}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.setState({ show: screen.ANSWER })}
              >
                <Text
                  style={[
                    styles.btnText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Answer
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => this.setState({ show: screen.QUESTION })}
              >
                <Text
                  style={[
                    styles.btnText,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Question
                </Text>
              </TouchableOpacity>
            )}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.optionsCorrect}
                onPress={() => this.handleAnswerQuestion(answer.CORRECT)}
              >
                <Text style={styles.btnText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.options}
                onPress={() => this.handleAnswerQuestion(answer.INCORRECT)}
              >
                <Text style={styles.btnText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  block: {
    marginBottom: 10,
  },
  count: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: "#324A59",
    backgroundColor: "#324A59",
    borderRadius: 5,
    padding: 16,
    width: "100%",
    height: "50%",
  },
  questionText: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  questionBox: {
    flex: 1,
    justifyContent: "center",
  },
  pass: {
    color: "#90EE93",
    fontSize: 46,
    textAlign: "center",
  },
  fail: {
    color: "#fe0604",
    fontSize: 46,
    textAlign: "center",
  },
  submitBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "#324A59",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  outlineBtn: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#FE0604",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#324A59",
  },
  options: {
    width: "40%",
    height: 50,
    borderWidth: 1,
    borderColor: "#FE0604",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  optionsCorrect: {
    width: "40%",
    height: 50,
    borderWidth: 1,
    borderColor: "#324A59",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
});

function mapStateToProps({ decks }, { route }) {
  const deckId = route.params.title;
  return {
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(Quiz);
