import { Loading } from '@/components/loading'
import { ONBOARDING_STORAGE_KEY } from '@/constants/storage'
import { Storage } from '@/lib/storage'
import { useTheme } from '@/providers'
import { Onboarding } from '@/screens/onboarding'
import { SignIn } from '@/screens/sign-in'
import { SignUp } from '@/screens/sign-up'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'

export type AuthStackParamList = {
  Onboarding: undefined
  SignIn: undefined
  SignUp: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  const [initialRouteName, setInitialRouteName] =
    useState<keyof AuthStackParamList>('Onboarding')

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const hasSeenOnboarding = await Storage.getItem(ONBOARDING_STORAGE_KEY)

        if (Boolean(hasSeenOnboarding)) {
          setInitialRouteName('SignIn')
        }
      } catch (error) {
        console.log(`Error loading onboarding info ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadAsync()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Navigator initialRouteName={initialRouteName}>
      <Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />

      <Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
        }}
      />
    </Navigator>
  )
}
