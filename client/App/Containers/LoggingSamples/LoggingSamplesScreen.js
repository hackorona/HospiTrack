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

  componentDidUpdate(prevProps){
    if (this.props.sampleSent !== prevProps.sampleSent
      && this.props.sampleSent){
        this.setState({sampleCounter: this.state.sampleCounter+1});
    }

    // Resets the counter when changing rooms
    if (this.props.savedRoomId !== prevProps.savedRoomId){
      this.setState({sampleCounter: 0});
    }
  }

  _fetchData = () => {
    this.props.startSample();
  }

  state = {
    sampleCounter: 0
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
            <View >
              <Text style={[Style.text]}>Thanks for helping us mapping the Hospital!</Text>
              <Text style={[Style.counter]}>Scans: {this.state.sampleCounter}</Text>
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
  sampleSent: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  wifiErrorMessage: state.wifi.wifiListErrorMessage,
  gpsErrorMessage: state.gps.gpsLocationErrorMessage && state.gps.gpsLocationErrorMessage.message,
  savedRoomId: state.samples.roomId,
  sampleSent: state.wifi.sampleSent,
})

const mapDispatchToProps = (dispatch) => ({
  startSample: () => dispatch(SamplesActions.startSample()),
  clearRoomId: () => dispatch(SamplesActions.clearRoomId()),
  setRoomId: (roomId) => dispatch(SamplesActions.setRoomId(roomId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggingSamplesScreen)