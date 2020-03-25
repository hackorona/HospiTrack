import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WifiActions from 'App/Stores/Wifi/Actions'
import Style from './WifiListScreenStyle'
import { Helpers, Images, Metrics } from 'App/Theme'

class WifiListScreen extends React.Component {
  componentDidMount() {
    this._fetchWifiList();
  }

  _fetchWifiList = () => {
    this.props.fetchWifiList()
  }
  
  componentDidUpdate(prevProps) {
    const {wifiList} = this.props;
    const {wifiList: prevWifiList} = prevProps;
    
    if (JSON.stringify(wifiList) != JSON.stringify(prevWifiList)) {
      console.log('wifiList ?', wifiList);
    }
  }

  render() {
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
            <TouchableOpacity onPress={this._fetchWifiList}>
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
                    {i} - ssid: {net.SSID}, level: {net.level}
                  </Text>
                ))
              }
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
}

const mapStateToProps = (state) => ({
  wifiList: state.wifi.wifiList,
  wifiIsLoading: state.wifi.wifiListIsLoading,
  wifiErrorMessage: state.wifi.wifiListErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWifiList: () => dispatch(WifiActions.fetchWifiList())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WifiListScreen)
