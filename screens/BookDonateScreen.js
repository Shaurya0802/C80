import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { MyHeader } from '../components/MyHeader';

export default class BookDonateScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            requestedBooksList: []
        }

        this.requestRef = null;
    }

    getRequestedBooksList = () => {
        this.requestRef = db.collection('requested_books').onSnapshot((snapshot) => {
            var requestedBooksList = snapshot.docs.map((doc) => doc.data());

            this.setState({
                requestedBooksList: requestedBooksList
            })
        });
    }

    componentDidMount() {
        this.getRequestedBooksList();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, i}) => {
        return (
            <ListItem 
                key={i}
                title={item.book_name}
                subTitle={item.reason_to_request}
                titleStyle={{color: '#000', fontWeight: 'bold'}}
                rightElement={
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color: '#fff'}}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />

        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MyHeader title="Donate Books"/>

                <View style={{flex: 1}}>
                    {this.state.requestedBooksList === 0 ? (
                        <View style={styles.subConatiner}>
                            <Text style={{fontSize: 20}}>List of all Requested Books</Text>
                        </View>
                    ) : (
                        <FlatList 
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedBooksList}
                            renderItem={this.renderItem}
                        >

                        </FlatList>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })