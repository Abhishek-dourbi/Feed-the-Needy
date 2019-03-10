import React, { Component } from 'react';
import { emailChanged,
         passwordChanged,
         loginUser } from '../actions';

import { Card, 
         CardSection,
         Input,
         Button,
         Spinner } from '../common';

import { connect } from 'react-redux';
import { View, Text, ImageBackground, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class LoginScreen extends Component {
    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onLoginButtonPress(){
        const { email, password } = this.props;
        this.props.loginUser({ email, password }, () => {
            this.props.navigation.navigate('main');
        });
    }

    onSignUpButtonPress(){
      this.props.navigation.navigate('sign');
    }
    
    renderError(){
        if(this.props.error){
            return(
                <View style={{ backgroundColor: 'rgba(0,0,0,0)', fontSize: 18 }}>
                <Text style={ styles.errorTextStyle }>
                    {this.props.error}
                </Text>
                </View>
            );
        }
    }

    renderLoginButton(){
        if(this.props.loading){
            return <Spinner size="large" />
        }
        return(
            <Button onPress={this.onLoginButtonPress.bind(this)}>Login</Button>
        );
    }

    renderSignUpButton() {
        return(
            <Button onPress={this.onSignUpButtonPress.bind(this)}>SignUp</Button>
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
          >
          <KeyboardAwareScrollView
                    enableOnAndroid
                    enableAutomaticScroll
                    keyboardOpeningTime={0}
                    extraHeight={Platform.select({ android: 100 })}
            >
          <View>
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
                    {this.renderLoginButton()}
                </CardSection>
                <CardSection>
                <View style={{ marginTop: 5, marginBottom: 5}}>
                    <Text style={{color: '#fff', fontSize: 18, marginLeft: 28}}>
                        Don't have any existing acoount?
                    </Text>
                </View>
                </CardSection>
                <CardSection>
                    {this.renderSignUpButton()}
                </CardSection>

            </Card></View></KeyboardAwareScrollView></ImageBackground>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
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
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginScreen);