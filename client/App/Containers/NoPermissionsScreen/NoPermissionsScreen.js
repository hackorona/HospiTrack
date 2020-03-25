import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helpers } from 'App/Theme'
import GrantPermissionBody from '../../Components/GrantPermissionBody'
import GrantPermissionActions from '../../Components/GrantPermissionActions'
import { permissionsService } from '../../Services/PermissionsService';
import PermissionsActions from '../../Stores/Permissions/Actions'

class NoPermissionsScreen extends React.Component {
  render() {
    const { isBlocked, requestPermissions } = this.props;

    return (
      <View
        style={[
          Helpers.fillColMain
        ]}
      >
        <GrantPermissionBody isBlocked={isBlocked} />
        <GrantPermissionActions
          onExitClick={permissionsService.exitApp}
          onSettingsClick={permissionsService.openSettings}
          requestPermission={requestPermissions}
          isBlocked={isBlocked} />
      </View>
    )
  }
}

NoPermissionsScreen.propTypes = {
  isGranted: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  requestPermissions: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isGranted: state.permissions.granted,
  isBlocked: state.permissions.blocked,
})

const mapDispatchToProps = (dispatch) => ({
  requestPermissions: () => dispatch(PermissionsActions.permissionsRequest())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoPermissionsScreen)
