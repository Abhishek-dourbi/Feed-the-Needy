import React, {Component} from 'react';
import {View, Text, Picker, ImageBackground, Platform, Image} from 'react-native';
import { CardSection, Input, Button } from '../common';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { donateUpdate, requestSubmit } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class DonateScreen extends Component {
    state = {
        pick: '',
        region:{
            latitude: 28.7041,
            longitude: 77.1025,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        },
    }

    onRegionChangeComplete = (region) => {
        console.log(region);
        this.setState({ region });
    }
    
    onSubmitButtonPress() {
        const{ people, phone, address } = this.props;
        const{ pick, region } = this.state;
        const { latitude, longitude } = this.state.region;
        this.props.requestSubmit({phone, address, latitude, longitude, pick, people, region});
        this.setState({ pick: ''});
    }

    renderSubmitButton() {
        return(
            <Button onPress={this.onSubmitButtonPress.bind(this)}>Submit</Button>
        );
    }

    render() {
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
                <MapView 
                    region={this.state.region}
                    style={{ flex: 1, height: 300}}
                    showUserLocation
                    followsUserLocation
                    showsMyLocationButton
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                    <MapView.Marker
                        coordinate={{latitude: this.state.region.latitude, longitude:this.state.region.longitude}}
                    >
                    </MapView.Marker>
                </MapView>
                <CardSection>
                    <Input 
                        label=""
                        placeholder="Mobile No."
                        value={this.props.phone}    
                        onChangeText={value => this.props.donateUpdate({prop: 'phone', value})}
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={{fontSize: 20, color: 'rgba(255,255,255,0.8)', marginLeft: 10}} >Select</Text>
                    <Picker 
                        style={styles.pickerTextStyle}
                        selectedValue={this.state.pick}
                        onValueChange={value => {
                            //this.props.donateUpdate({prop: 'pick', value});
                            this.setState({pick: value});
                        }}
                    >
                        <Picker.Item label="Slums" value="Slums" />
                        <Picker.Item label="Orphanages" value="Orphanages" />
                        <Picker.Item label="Hospitals" value="Hospitals" />
                        <Picker.Item label="Roadside" value="Roadside" />
                        <Picker.Item label="Shelter Home" value="Shelter Home" />
                        <Picker.Item label="Old Age Home" value="Old Age Home" />
                    </Picker>
                </CardSection>

                <CardSection>
                    <Input 
                        label=""
                        placeholder="Address"
                        value={this.props.address}    
                        onChangeText={value => this.props.donateUpdate({prop: 'address', value})}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        label=""
                        placeholder="No. of People"
                        value={this.props.people}    
                        onChangeText={value => this.props.donateUpdate({prop: 'people', value})}
                    />
                </CardSection>
                <CardSection>
                    {this.renderSubmitButton()}
                </CardSection>
                </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 100
    },
    pickerTextStyle: {
       color: 'rgba(255,255,255,0.8)',
       marginLeft: 130,
       fontSize: 30
    }
};

const mapStateToProps = (state) => {
    const { loc, phone, address, people} = state.donate;
    return { loc, phone, address, people };
}

export default connect(mapStateToProps, { donateUpdate, requestSubmit })(DonateScreen);