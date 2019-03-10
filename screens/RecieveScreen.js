import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { requestFetch } from '../actions';
import {  MapView, Location, Permissions } from 'expo';
import firebase from 'firebase';

class RecieveScreen extends Component {

    componentWillMount() {
            this.props.requestFetch();
    }

    state = {
        mapregion:{
            latitude: 30.7041,
            longitude: 77.1025,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        },
        location: {coords: { latitude: 30.7041, longitude: 77.1025}}
    }
    
    componentDidMount() {
        this._getLocationAsync();
      }
    
    
      _getLocationAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
       if (status !== 'granted') {
         this.setState({
           locationResult: 'Permission to access location was denied'
         });
       }
    
       let location = await Location.getCurrentPositionAsync({});
       this.setState({location});
     };
    
     renderMarkers() {
      return this.props.requests.map((request, i) => (
        <MapView.Marker 
          key={i}
          title={request.pick}
          coordinate={request.region}
        >
          <MapView.Callout>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {request.pick}
            </Text>
            <Text>
              Address: {request.address}
            </Text>
            <Text>
              Phone: {request.phone}
            </Text>
          </MapView.Callout>
        </MapView.Marker>
      ));
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <MapView
                    region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                    style={{ flex: 1 }}
                    showUserLocation
                    showsMyLocationButton
                    onRegionChangeComplete={this.handleMapRegionChange}
                >
                  {this.renderMarkers()}
                </MapView>
                <TouchableOpacity 
                  onPress={() => {firebase.auth().signOut();
                  this.props.navigation.navigate('log');
                  }}
                  style={{
                    position: 'absolute',
                    alignSelf: 'stretch',
                    backgroundColor: '#007aff',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#007aff',
                    marginTop: 520,
                    marginLeft: 270,
                    marginRight: 5,
                    height: 50,
                    width: 80,
                    marginBottom: 15
                  }}
                >
                <Text 
                  style={{alignSelf: 'center',
                    color: '#fff',
                    fontSize: 19,
                    fontWeight: '600',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  Sign Out
                </Text>
                </TouchableOpacity>
            </View>
          );
    }
}

const mapStateToProps = (state) => {
  const requests = _.map(state.request, (val, uid) => {
  return { ...val, uid };
});
  return { requests };
};
export default connect(mapStateToProps, { requestFetch })(RecieveScreen);