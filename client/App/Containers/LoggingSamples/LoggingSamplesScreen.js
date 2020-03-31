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
    const { gpsErrorMessage, wifiErrorMessage, setRoomId, clearRoomId, savedRoomId } = this.props;

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
              <View>
                <Text style={Style.error}>{gpsErrorMessage ? `GPS: ${gpsErrorMessage}` : null}</Text>
                <Text style={Style.error}>{wifiErrorMessage ? `WIFI: ${wifiErrorMessage}` : null}</Text>
              </View>
                {/* <Text style={Style.instructions}>
                  Hit the start, stop...
                </Text> */}
            </View>
          </View>
          <View>
            <RoomIdSelect
              onSubmit={(roomId) => setRoomId(roomId)}
              onClear={clearRoomId}
              savedRoomId={savedRoomId}
            />
          </View>
        </View>
      </View>
    )
  }
}

LoggingSamplesScreen.propTypes = {
  wifiErrorMessage: PropTypes.string,
  gpsLocationErrorMessage: PropTypes.string,
  startSample: PropTypes.func.isRequired,
  savedRoomId: PropTypes.number,
  clearRoomId: PropTypes.func.isRequired,
  setRoomId: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  wifiErrorMessage: state.wifi.wifiListErrorMessage,
  gpsErrorMessage: state.gps.gpsLocationErrorMessage && state.gps.gpsLocationErrorMessage.message,
  savedRoomId: state.samples.roomId
})

const mapDispatchToProps = (dispatch) => ({
  startSample: () => dispatch(SamplesActions.startSample()),
  clearRoomId: () => dispatch(SamplesActions.clearRoomId()),
  setRoomId: () => dispatch(SamplesActions.setRoomId())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggingSamplesScreen)