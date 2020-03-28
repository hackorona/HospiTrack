import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WifiActions from 'App/Stores/Wifi/Actions'
import GpsActions from 'App/Stores/Gps/Actions'
import Style from './WifiListScreenStyle'
import { Helpers, Images, Metrics } from 'App/Theme'

class WifiListScreen extends React.Component {
  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    this.props.fetchWifiList();
    this.props.fetchGpsLocation();
  }
  
  componentDidUpdate(prevProps) {
    const {wifiList} = this.props.wifiList;
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
      gpsData = 
          <Text>
            {"\n"}     
            accuracy: {this.props.gpsLocation.accuracy}, {"\n"}
            alt:      {this.props.gpsLocation.altitude}, {"\n"}
            lat:      {this.props.gpsLocation.latitude}, {"\n"}
            long:     {this.props.gpsLocation.longitude}
          </Text> 
    } else {
      gpsData = 
      <Text>
        gps data loading or unavailable
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
        {this.props.wifiIsLoading || this.props.gpsLocationIsLoading ? (
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
                this.props.wifiList.map((net, i) => (
                  <Text key={`net_${i}`} style={Style.result}>
                    {i+1} - ssid: {net.SSID}, RSSI: {net.level}
                  </Text>
                ))
              }   
              </View>
            )}
            
            {this.props.gpsLocationErrorMessage ? (
              <Text style={Style.error}>{this.props.gpsLocationErrorMessage}</Text>
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

WifiListScreen.propTypes = {
  wifiIsLoading: PropTypes.bool.isRequired,
  wifiErrorMessage: PropTypes.string,
  wifiList: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchWifiList: PropTypes.func.isRequired,

  gpsLocation: PropTypes.object,
  gpsLocationIsLoading: PropTypes.bool.isRequired,
  gpsLocationErrorMessage: PropTypes.string,
  fetchGpsLocation: PropTypes.func.isRequired,
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
  fetchWifiList: () => dispatch(WifiActions.fetchWifiList()),
  fetchGpsLocation: () => dispatch(GpsActions.fetchGpsLocation())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WifiListScreen)
