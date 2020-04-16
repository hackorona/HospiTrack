/**
 * Images should be stored in the `App/Images` directory and referenced using variables defined here.
 */

const IMAGES_PATH = 'App/Assets/Images';

export default {
  Logo: require('App/Assets/Images/Logo.png'),
  NoLocationPermission: require(`${IMAGES_PATH}/NoLocationPermission.png`),
  Location: require(`${IMAGES_PATH}/Location.png`)
}
