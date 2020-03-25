import React from 'react'
import { TouchableOpacity, Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import WifiActions from 'App/Stores/Wifi/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import NavigationService from '../../Services/NavigationService'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class ExampleScreen extends React.Component {
  componentDidMount() {
    this._fetchUser()
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
            {/* Temp... */}
            <Button title="Start Flow" onPress={() => NavigationService.navigate('WizardScreen')}></Button>
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

  _fetchUser() {
    this.props.fetchUser()
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  fetchWifiList: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
  wifiList: state.wifi.wifiList,
  wifiIsLoading: state.wifi.wifiListIsLoading,
  wifiErrorMessage: state.wifi.wifiListErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
  fetchWifiList: () => dispatch(WifiActions.fetchWifiList())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
