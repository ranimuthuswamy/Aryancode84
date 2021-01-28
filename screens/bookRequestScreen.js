import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import firebase from "firebase";
import MyHeader from "../components/myHeader";

import db from "../config";

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonForRequest: "",
    };
  }
  createUniqueId=()=>{
    return Math.random().toString(36).substring(7)
  }

  addRequest = (bookName, reasonForRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_books").add({
      user_Id: userId,
      book_name: bookName,
      reason_for_request: reasonForRequest,
      request_id: randomRequestId,
    });
    this.setState({
        bookName:"",
        reasonForRequest:""
    });
    return Alert.alert("Book Requested Successfully")
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Request Book"  navigation ={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyboardStyles}>
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Book Name"
            value={this.state.bookName}
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Why do you need the Book??"
            value={this.state.reasonForRequest}
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => {
              this.setState({
                reasonForRequest: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonForRequest);
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ff5645",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#56fabc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  keyboardStyles: { flex: 1, justifyContent: "center", alignItems: "center" },
});
