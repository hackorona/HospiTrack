import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WifiActions from 'App/Stores/Wifi/Actions'
import GpsActions from 'App/Stores/Gps/Actions'
import Style from './DataScreenStyle'
import { Helpers, Images, Metrics } from 'App/Theme'

class DataScreen extends React.Component {
  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    this.props.startSample();
  }
  
  componentDidUpdate(prevProps) {
    const {wifiList} = this.props;
    const {wifiList: prevWifiList} = prevProps;
    
    if (JSON.stringify(wifiList) != JSON.stringify(prevWifiList)) {
      console.log('wifiList ?', wifiList);
    } else {
      console.log('Wifi did not change :-(');
    }
  }

  render() {

    // Handle gpsLocation being undefined
    let gpsData;
    if(this.props.gpsLocation){
      let {gpsLocation} = this.props;
      gpsData = 
          <Text> 
            {"\n"}
            accuracy: {gpsLocation.accuracy }, {"\n"}
            alt:      {gpsLocation.altitude }, {"\n"}
            lat:      {gpsLocation.latitude }, {"\n"}
            long:     {gpsLocation.longitude}
          </Text> 
    } else {
      gpsData = 
      <Text>
        {"\n"}
        GPS data is loading...
      </Text>
    }
    
    return (
      <View
        style={[
          Helpers.fill,
          Helpers.rowMain,
          Metrics.mediumHorizontalMargin,
          Metrics.mediumVerticalMargin,
        ]}
      >
        {this.props.wifiIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <TouchableOpacity onPress={this._fetchData}>
              <View style={Style.logoContainer}>
                <Image style={Helpers.fullSize} source={Images.logo} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>
            {this.props.wifiErrorMessage ? (
              <Text style={Style.error}>{this.props.wifiErrorMessage}</Text>
            ) : (
              <View>              
                {
                  this.props.wifiList && this.props.wifiList.map((net, i) => (
                    <Text key={`net_${i}`} style={Style.result}>
                      {i+1}. ssid: {net.SSID}, RSSI: {net.level}
                    </Text>
                  ))
                }           
              </View>
            )}
            
            {this.props.gpsLocationErrorMessage ? (
              <Text style={Style.error}>
                {this.props.gpsLocationErrorMessage.message}
              </Text>
            ) : (
              <View>
              {gpsData}
              </View>
            )}
          </View>
        )}
      </View>
    )
  }
}

DataScreen.propTypes = {
  wifiIsLoading: PropTypes.bool.isRequired,
  wifiErrorMessage: PropTypes.string,
  wifiList: PropTypes.arrayOf(PropTypes.object),
  gpsLocation: PropTypes.object,
  gpsLocationIsLoading: PropTypes.bool.isRequired,
  gpsLocationErrorMessage: PropTypes.object,
}

const mapStateToProps = (state) => ({
  wifiList: state.wifi.wifiList,
  wifiIsLoading: state.wifi.wifiListIsLoading,
  wifiErrorMessage: state.wifi.wifiListErrorMessage,
  gpsLocation: state.gps.gpsLocation && state.gps.gpsLocation.coords,
  gpsLocationIsLoading: state.gps.gpsLocationIsLoading,
  gpsLocationErrorMessage: state.gps.gpsLocationErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  startSample: () => dispatch({type: 'START_SAMPLE'})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataScreen)