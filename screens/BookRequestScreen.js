import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {MyHeader} from '../components/MyHeader';

export default class BookRequestScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: firebase.auth().currentUser.email,
            reasonToRequest: '',
            bookName: ''
        }
    }

    addRequest = (bookName, reasonToRequest) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();

        db.collection('requested_books').add({
            "user_id": userId,
            "book__name": bookName,
            "reason_to_request": reasonToRequest,
            "request_id": randomRequestId
        });

        this.setState({
            reasonToRequest: '',
            bookName: ''
        });

        return Alert.alert('Book requested successfully');
    }

    createUniqueId = () => {
        var rand = Math.random().toString(36);

        return rand.substring(7);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader title="Request Book"/>

                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput 
                        placeholder="Enter Book Name" 
                        style={styles.formTextInput}
                        onChangeText={e => {this.setState({bookName: e})}}
                        value={this.state.bookName}
                    />

                    <TextInput 
                        placeholder="Enter Reason to Request" 
                        style={styles.formTextInput}
                        multiline numberOfLines={8}
                        onChangeText={e => {this.setState({reasonToRequest: e})}}
                        value={this.state.reasonToRequest}
                    />

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => {
                            this.addRequest(this.state.bookName, this.state.reasonToRequest)
                        }}
                    >
                            <Text>Request Book</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )