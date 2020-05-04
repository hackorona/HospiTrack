import React from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helpers } from 'App/Theme'
import SampleBody from '../../Components/SampleBody'
import SampleActions from '../../Stores/Samples/Actions';

class ScanningScreen extends React.Component {
  render() {
    const { isScanning, startSampling, stopSampling } = this.props;

    const helperText = isScanning ? 
      'You can stop scanning any time' : 'Press button to start scanning!'

    return (
      <View
        style={[
          Helpers.fillColMain
        ]}
      >
        <SampleBody
          helperText={helperText}
          btnTitle={isScanning ? 'stop': 'start'}
          btnAction={isScanning ? stopSampling : startSampling}/>
      </View>
    )
  }
}

ScanningScreen.propTypes = {
  isScanning: PropTypes.bool.isRequired,
  startSampling: PropTypes.func.isRequired,
  stopSampling: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isScanning: state.samples.isSampling,
})

const mapDispatchToProps = (dispatch) => ({
  startSampling: () => dispatch(SampleActions.startSample()),
  stopSampling: () => dispatch(SampleActions.stopSample())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanningScreen)
