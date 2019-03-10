import React, {Component} from 'react';
import { TextInput, Text, View} from 'react-native';

const  Input = ( { label, value, onChangeText, placeholder, secureTextEntry} ) => {
    const { inputStyle, labelStyle, containerStyle} = styles;
    return(
        <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput 
            placeholder = {placeholder}
            style = {inputStyle}
            value = {value}
            onChangeText = {onChangeText}
            autoCorrect = {false}
            secureTextEntry = {secureTextEntry}
        />
        </View>
    );
};

const styles = {
    inputStyle: {
        color: 'rgba(255,255,255,0.8)',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        color: '#fff',
        fontSize: 20,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}
export { Input };