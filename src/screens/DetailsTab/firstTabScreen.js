import moment from 'moment';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';
import Countdown, {TickEmitter} from './Countdown';
import LocationView from './LocationView';
import * as Constants from '../Constants';
import ParallaxView from 'react-native-parallax-view'


const locationSrc = require('../../images/location.png');

const {width} = Dimensions.get('window');

class FirstTabScreen extends Component {

  static navigatorStyle = {
    navBarBackgroundColor: Constants.navBarBackgroundColor,
    navBarTextColor: Constants.navBarTextColor,
    navBarBlur: true,
  };

  constructor(props) {
    super(props);
    this.ticker = new TickEmitter('eventTicker');
  }

  rsvp(){
    Navigation.showModal({
      screen: 'details.RSVPScreen',
      title: 'RSVP',
      navigatorStyle: {},
      navigatorButtons: {
        leftButtons: [{
          title: 'Cancel',
          id: 'navBarCancel'
        }]
      }
    });
  }

  componentDidMount() {
    this.ticker.startInterval();
  }

  componentWillUnmount() {
    this.ticker.stopInterval();

  }
  render() {
    const {details} = this.props;
    const dateString = moment(details.startDate).format('MMMM DD - HH:mm');
    return (
      <ParallaxView
        style={{backgroundColor: '#165574', height: 80}}
        backgroundSource={{uri: details.logoImageURL}}
        windowHeight={80}>
        <ScrollView style={styles.container}>
          <View style={styles.countdownSection}>
            <Countdown ticker={this.ticker} startTime={details.startDate}/>
          </View>

          <View style={styles.detailsSection}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{color: '#ffffff', fontSize: 28, }}>{details.title}</Text>
              <Text style={{color: '#cad2c5', fontSize: 16, fontWeight: '500'}}>{details.description}</Text>
              <Text style={{marginTop: 15, color: '#ffffff', fontSize: 28, marginBottom: 80}}>{dateString} &#x2022;{details.city.toUpperCase()} </Text>
            </View>
          </View>
          <View style={styles.rsvpSection}>
            <TouchableOpacity style={styles.rsvpButton} onPress={this.rsvp}>
              <Text style={styles.rsvpButtonText}>RSVP</Text>
            </TouchableOpacity>
            <LocationView
              title={details.title}
              description={details.detailedLocation}
              latitude={details.location.latitude}
              longitude={details.location.longitude}
            >
            </LocationView>
          </View>
        </ScrollView>
      </ParallaxView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#165574',
  },
  countdownSection: {
    flex: 0.5,
    paddingTop: 10,
    backgroundColor: '#ebebeb',
    paddingLeft: 25,
    paddingRight: 25,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: '#165574',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 40,
    paddingBottom: 120,
  },
  rsvpSection: {
    flex: 1,
    paddingTop: 120,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#165574',
    alignItems: 'center',
    paddingBottom: 60
  },
  rsvpButton: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 12,
    paddingLeft: 100,
    paddingRight: 100,
    width: width - 40,
    borderRadius: 5,
  },
  rsvpButtonText: {
    color: '#ebebeb',
    fontSize: 28,
    textAlign: 'center'
  },
  mapContainer: {
    position: 'absolute',
    top: -80,
    left: 20,
    height: 180,
    width: width - 40,
    borderWidth: 3,
    borderColor: '#ebebeb'
  },
});

export default connect(mapStateToProps)(FirstTabScreen);
