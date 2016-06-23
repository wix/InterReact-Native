import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {mapStateToProps} from '../../store';
import {connect} from 'react-redux';
import * as actions from '../../store/constants/actions';
import {Navigation} from 'react-native-navigation';
import firebaseService from '../../services/firebase';
import Countdown, {TickEmitter} from './Countdown';

const locationSrc = require('../../images/location.png');
const {height, width} = Dimensions.get('window');

class FirstTabScreen extends Component {

  constructor(props) {
    super(props);
    this.ticker = new TickEmitter('eventTicker');

    //firebaseService.readConf().then(data => this.props.dispatch({type: actions.UPDATE_STATE, data}));
    firebaseService.listenToConfChanges(data => {
      if (data) {
        //console.warn('listen', data)
        this.props.dispatch({type: actions.UPDATE_STATE, data});
      }
    })
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
    const {details, attendees} = this.props;
    const {title, description, date, city, coordinates} = details;
    return (
      <View style={styles.container}>
        <View style={styles.countdownSection}>
          <Countdown ticker={this.ticker} startTime={1466874046036}/>
        </View>

        <View style={styles.detailsSection}>
          <Text style={{color: '#ffffff', fontSize: 42, fontWeight: '600'}}>{details.title}</Text>
          <Text style={{color: '#cad2c5', fontSize: 16, fontWeight: '500'}}>{details.description}</Text>
          <Text style={{marginTop: 15, color: '#ffffff', fontSize: 32, fontWeight: '500'}}>{details.date.toUpperCase()} &#x2022; {details.city.toUpperCase()} </Text>



        </View>
        <View style={styles.rsvpSection}>
          <TouchableOpacity style={styles.rsvpButton} onPress={this.rsvp}>
            <Text style={styles.rsvpButtonText}>RSVP</Text>
          </TouchableOpacity>
          <Image style={styles.mapContainer} source={locationSrc}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  countdownSection: {
    height: 90,
    paddingTop: 10,
    backgroundColor: '#ebebeb'
  },
  detailsSection: {
    backgroundColor: '#52489c',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 120,
  },
  rsvpSection: {
    flex: 1,
    paddingTop: 160,
    backgroundColor: '#59c3c3',
    alignItems: 'center'
  },
  rsvpButton: {
    borderWidth: 2,
    borderColor: '#ebebeb',
    padding: 15,
    paddingLeft: 90,
    paddingRight: 90,
  },
  rsvpButtonText: {
    color: '#ebebeb',
    fontSize: 28,
    fontWeight: '600'
  },
  mapContainer: {
    position: 'absolute',
    top: -100,
    left: 20,
    height: 200,
    width: width - 40,
    borderWidth: 3,
    borderColor: '#ebebeb'
  },
});

export default connect(mapStateToProps)(FirstTabScreen);