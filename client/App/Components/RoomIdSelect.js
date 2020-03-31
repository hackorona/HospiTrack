import React from 'react'
import { View, Button } from 'react-native'
import { Helpers, Fonts } from '../Theme';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

class RoomIdSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null
    }
  }

  onRoomIdChange = (roomId) => {
    this.setState({
      roomId
    });
  }

  clear = () => {
    const roomId = null;
    this.setState({
      roomId
    });
    // Let container know we cleared.
    this.props.onSubmit(roomId);
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.roomId);
  }

  render() {
    const { onSubmit } = this;

    return (
      <View>
        <View style={Helpers.colCenter}>
          <TextInput  
            placeholder="Enter Room ID"
            underlineColorAndroid='transparent'  
            style={[Helpers.textCenter, Fonts.normal]}
            value={this.state.roomId}
            onChangeText={(newVal) => this.onRoomIdChange(newVal)}
            keyboardType='numeric'
          />
        </View>
        <View style={[Helpers.row, Helpers.scrollSpaceBetween]}>
          <View style={{width: '40%'}}>
            <Button title="OK" onPress={onSubmit}></Button>
          </View>
          <View style={{width: '40%'}}>
            <Button color="grey" title="clear" onPress={this.clear}></Button>
          </View>
        </View>
      </View>

    );
  }
}

RoomIdSelect.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default RoomIdSelect;