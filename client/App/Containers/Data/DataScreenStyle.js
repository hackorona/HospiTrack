import { StyleSheet } from 'react-native'
import { Helpers, Metrics, Fonts, Colors } from 'App/Theme'

export default StyleSheet.create({
  error: {
    ...Fonts.normal,
    color: Colors.error,
    marginBottom: Metrics.tiny,
    textAlign: 'center',
  },
  instructions: {
    ...Fonts.normal,
    fontStyle: 'italic',
    marginBottom: Metrics.tiny,
    textAlign: 'center',
  },
  logoContainer: {
    ...Helpers.fullWidth,
    height: 150,
    marginBottom: 5,
  },
  result: {
    ...Fonts.normal,
    marginBottom: Metrics.tiny,
    textAlign: 'left',
  },
  text: {
    ...Fonts.normal,
    marginBottom: Metrics.tiny,
    textAlign: 'center',
  },
})
