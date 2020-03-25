import NavigationService from '../Services/NavigationService'
import { Platform } from 'react-native'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // We can see if android or ios!
  const platformMsg = Platform.select({
    ios: 'This is ios',
    android: 'This is android',
  });

  console.log('platformMsg ?', platformMsg);

  // Add more operations you need to do at startup here
  // TODO: maybe ask permissions here?
  // Splash screen is shown till navigateAndReset is called ad end of this saga
  // ...

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('MainScreen')
}
