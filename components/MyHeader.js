import React from 'react';
import { Header } from 'react-native-elements';

export const MyHeader = props => {
    return (
        <Header 
            centerComponent={{text: props.title, style: {color: '#000', fontSize: 20, fontWeight: 'bold'}}}
            backgroundColor = '#fff'
        />
    );
}