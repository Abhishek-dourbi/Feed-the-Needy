import React from 'react';
import { View,Text } from 'react-native';

const Card = (props) => {
    return(
        <View style={styles.containerStyle}>
           {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(255,255,255,0.4)',
        borderBottomWidth: 0,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 2,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 180,
    }
}
export { Card };