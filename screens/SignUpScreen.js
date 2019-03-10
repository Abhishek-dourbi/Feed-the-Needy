import React, { Component } from 'react';

import { emailChanged,
         passwordChanged,
         signUpUser } from '../actions';

import { Card, 
         CardSection,
         Input,
         Button,
         Spinner } from '../common';

import { connect } from 'react-redux';
import { View, Text, ImageBackground } from 'react-native';

class SignUpScreen extends Component {
    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onButtonPress(){
        const { email, password } = this.props;
        this.props.signUpUser({ email, password }, () => {
            this.props.navigation.navigate('log');
        });
    }

    renderError(){
        if(this.props.error){
            return(
                <View style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
                <Text style={ styles.errorTextStyle }>
                    {this.props.error}
                </Text>
                </View>
            );
        }
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large" />
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>Sign Up</Button>
        );
    }

    render(){
        return(
            <ImageBackground
            source={{uri: 'http://images5.fanpop.com/image/photos/28600000/poor-people-th-CE-B5-CF-81-C3-B8-E1-B9-BF-CE-B5r-CF-84y-28635552-780-520.jpg'}}
            style={{ flex: 1,
              width: null,
              height: null,
              }}
          ><View>
            <Card>
                <CardSection>
                    <Input 
                        label = "Email"
                        placeholder = "abc@email.com"
                        onChangeText = {this.onEmailChange.bind(this)}
                        value = { this.props.email }
                    />    
                </CardSection>

                <CardSection>    
                    <Input
                        secureTextEntry 
                        label = "Password"
                        placeholder = "password"
                        onChangeText = {this.onPasswordChange.bind(this)}
                        value = { this.props.password }
                    />
                </CardSection>

                    {this.renderError()}
                
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card></View></ImageBackground>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

function mapStateToProps({ auth }) {
    //return{
        //email: state.auth.email, 
        //password: state.auth.password,   
        //error: state.auth.error
    //};
        const { email, password, error, loading } = auth;
        return { email, password, error, loading };     
    
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, signUpUser })(SignUpScreen);