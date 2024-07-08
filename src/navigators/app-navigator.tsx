import { Home } from '@/screens/home/home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AppStackParamList = {
  Home: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>()

export function AppNavigator() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}
