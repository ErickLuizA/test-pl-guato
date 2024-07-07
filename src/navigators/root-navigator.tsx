import { useAuth, useTheme } from '@/providers'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { AppNavigator } from './app-navigator'
import { AuthNavigator } from './auth-navigator'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'

export function RootNavigator() {
  const { isAuthenticated, isLoading: isLoadingAuth } = useAuth()
  const { isDark, colors, isLoading: isLoadingTheme } = useTheme()

  useEffect(() => {
    const loadingValues = [isLoadingTheme, isLoadingAuth]

    if (loadingValues.some((val) => val)) return

    SplashScreen.hideAsync()
  }, [isLoadingTheme, isLoadingAuth])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={{ dark: isDark, colors }}>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  )
}
