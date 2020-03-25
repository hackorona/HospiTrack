import React from 'react'
import { TouchableOpacity, Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import WifiActions from 'App/Stores/Wifi/Actions'
import { Helpers, Metrics } from 'App/Theme'

class NoPermissionsScreen extends React.Component {
  componentDidMount() {
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
        {/* <NoPermissionMsg /> */}
        <Text>Now we cry!</Text>
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

NoPermissionsScreen.propTypes = {
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
)(NoPermissionsScreen)
