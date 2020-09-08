import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'; 
import firebase from 'firebase';
import SantaAnimation from '../components/SantaClaus';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: '',
            address: '',
            contact: '',
            firstName: '',
            lastName: '',
            confirmPassword: ''        
        }
    }

    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(() => {
            return (
                Alert.alert('Successfully Logged in')
            );
        }).catch((error) => {
            var errorMessage = error.message;
            var errorCode = error.code;

            return Alert.alert(errorMessage);
        });
    }

    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Password doesn't match \n Check your password");
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                return (
                    Alert.alert('Successfully Signed Up')
                );
            }).catch((error) => {
                var errorMessage = error.message;

                return Alert.alert(errorMessage);
            })
            
            db.collection('users').add({
                address: this.state.address,
                contact: this.state.contact,
                email_id: this.state.emailId,
                first_name: this.state.firstName,
                last_name: this.state.lastName
            });
        }
    }

    showModal = () => {
        return (
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: "100%"}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>Registration</Text>

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={e => {this.setState({firstName: e})}}
                            />

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"Last Name"}
                                maxLength={8}
                                onChangeText={e => {this.setState({lastName: e})}}
                            />

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"abc@example.com"}
                                keyboardType={"email-address"}
                                onChangeText={e => {this.setState({emailId: e})}}
                            />

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"Address"}
                                multiline={true}
                                onChangeText={e => {this.setState({address: e})}}
                            />

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"Contact Number"}
                                maxLength={10}
                                keyboardType={"numeric"}
                                onChangeText={e => {this.setState({contact: e})}}
                            />

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({password: e})}}
                            />

                            <TextInput 
                                style={styles.formTextInput}
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({confirmPassword: e})}}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity 
                                    style={styles.registerButton}
                                    onPress={() => {this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={() => {this.setState({isModalVisible: false})}}
                                >
                                    <Text style={styles.registerButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {this.showModal()}
                </View>                

                <View style={styles.profileContainer}>
                    <SantaAnimation />
                    <Text style={styles.title}>Book Santa</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TextInput style={styles.input} keyboardType="email-address" onChangeText={text => this.setState({emailId: text})} placeholder="abc@example.com" />
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => this.setState({password: text})} placeholder="Enter Password" />

                    <TouchableOpacity 
                        onPress={() => {this.userLogin(this.state.emailId, this.state.password)}}
                        style={[styles.button, {marginBottom: 20, marginTop: 20}]}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {this.setState({isModalVisible: true})}}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: 'black',
        fontSize: 20,
        padding: 10,
        margin: 10
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ff9800',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#f8be85'
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#ff3d00'
    },
    modalTitle: {
        justifyContent:'center',
        alignSelf: 'center',
        fontSize: 20,
        color: '#000',
        margin: 50
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 40
    },
    formTextInput: {
        width: '75%',
        height: 35,
        alignSelf: 'center',
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
    },
    registerButton: {
        width: 200, 
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 70
    },
    registerButtonText: {
        color: '#000',
        fontSize: '15',
        fontWeight: 'bold',
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    }
});