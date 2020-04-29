import { StyleSheet } from 'react-native'
import { Colors } from 'App/Theme'
import { Helpers } from '../../Theme'

const LOGO_SIZE = 500;

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  logo: {
    ...Helpers.fullWidth,
    backgroundColor: Colors.white,
    height: LOGO_SIZE,
    width: LOGO_SIZE,
  },
})
