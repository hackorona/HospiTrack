import React from 'react'
import { TouchableOpacity, Text, View,ScrollView, ActivityIndicator, Image } from 'react-native'
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
    this.props.fetchWifiList();
    this.props.fetchGpsLocation();
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
            accuracy: {gpsLocation.accuracy }, {"\n"}
            alt:      {gpsLocation.altitude }, {"\n"}
            lat:      {gpsLocation.latitude }, {"\n"}
            long:     {gpsLocation.longitude}
          </Text> 
    } else {
      gpsData = 
      <Text>
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
              {this.props.gpsLocationErrorMessage ? (
                <Text style={Style.error}>
                  {this.props.gpsLocationErrorMessage.message}
                </Text>
              ) : (
                <View>
                {gpsData}
                </View>
              )}
            <ScrollView>
              {this.props.wifiErrorMessage ? (
                <Text style={Style.error}>{this.props.wifiErrorMessage}</Text>
              ) : (
                <View>
                <Text>
                  {"\n"}
                </Text>             
                  {
                    this.props.wifiList.map((net, i) => (
                      <Text key={`net_${i}`} style={Style.result}>
                        {i+1}. SSID: {net.SSID}, {"\n   "} RSSI: {net.level}
                      </Text>
                    ))
                  }           
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    )
  }
}

DataScreen.propTypes = {
  wifiIsLoading: PropTypes.bool.isRequired,
  wifiErrorMessage: PropTypes.string,
  wifiList: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchWifiList: PropTypes.func.isRequired,
  gpsLocation: PropTypes.object,
  gpsLocationIsLoading: PropTypes.bool.isRequired,
  gpsLocationErrorMessage: PropTypes.object,
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
)(DataScreen)