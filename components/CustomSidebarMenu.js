import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class CustomSidebarMenu extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems 
                        {...this.props}
                    />
                </View>

                <View style={styles.logoutContainer}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => {
                            this.props.navigation.navigate('LoginScreen')
                            firebase.auth().signOut().then(function() {
                                Alert.alert('Signed Out successfully')
                            }).catch((error) => {
                                Alert.alert(error.message);
                            });
                        }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerItemsContainer: {
        flex: 0.8,
        marginTop: 100
    },
    logoutContainer: {
        flex: 0.2,
        justifyContent: "flex-end",
        paddingBottom: 30,
        marginBottom: 100
    },
    logoutButton: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        padding: 10,
    }
})