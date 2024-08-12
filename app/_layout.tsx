/* eslint-disable camelcase */
import {
  Rowdies_300Light,
  Rowdies_400Regular,
  Rowdies_700Bold,
  useFonts,
} from '@expo-google-fonts/rowdies'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Rowdies_300Light,
    Rowdies_400Regular,
    Rowdies_700Bold,
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          statusBarHidden: false,
          statusBarTranslucent: true,
          headerShown: false,
          animation: 'slide_from_bottom',
          autoHideHomeIndicator: true,
        }}
      />
    </Stack>
  )
}
