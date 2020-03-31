import React from 'react'
import { TouchableOpacity, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SamplesActions from '../../Stores/Samples/Actions'
import Style from './LoggingSamplesScreenStyle'
import { Helpers, Images, Metrics } from '../../Theme'
import RoomIdSelect from '../../Components/RoomIdSelect'

class LoggingSamplesScreen extends React.Component {
  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    this.props.startSample();
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
        <View style={Helpers.mainSpaceBetween}>
          <View>
            <View style={Style.logoContainer}>
              <Image source={Images.Location} resizeMode={'contain'} />
            </View>
            <View style={Helpers.center}>
              <Text style={[Style.text]}>Thanks for helping us mapping the Hospital!</Text>
                {/* <Text style={Style.instructions}>
                  Hit the start, stop...
                </Text> */}
            </View>
          </View>
          <View>
            <RoomIdSelect onSubmit={(roomId) => console.log('this should change store with ' + roomId)}></RoomIdSelect>
          </View>
        </View>
      </View>
    )
  }
}

LoggingSamplesScreen.propTypes = {
  wifiErrorMessage: PropTypes.string,
  gpsLocationErrorMessage: PropTypes.string,
  startSample: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  wifiErrorMessage: state.wifi.wifiListErrorMessage,
  gpsLocationErrorMessage: state.gps.gpsLocationErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  startSample: () => dispatch(SamplesActions.startSample())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggingSamplesScreen)