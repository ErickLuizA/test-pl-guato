import { AuthProvider } from '@/providers'
import { ThemeProvider } from '@/providers/theme/theme'
import React from 'react'
import { RootNavigator } from '@/navigators/root-navigator'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function EntryPoint() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  )
}
