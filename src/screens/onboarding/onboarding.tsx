import { Onboarding as OnboardingComponent } from '@/components/onboarding'
import { ONBOARDING_STORAGE_KEY } from '@/constants/storage'
import { Storage } from '@/lib/storage'
import { useTheme } from '@/providers'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const DATA = [
  {
    imageSource: require('../../../assets/images/onboarding_first.png'),
    title: 'Beauty parlour at your home',
    subtitle:
      'Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
  },
  {
    imageSource: require('../../../assets/images/onboarding_second.png'),
    title: 'Plumber & expart nearby you',
    subtitle:
      'Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
  },
  {
    imageSource: require('../../../assets/images/onboarding_third.png'),
    title: 'Professional home cleaning',
    subtitle:
      'Lorem ipsum is a placeholder text commonly used to demonstrate the visual.',
  },
]

export function Onboarding() {
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  const handleNavigateToSignIn = () => {
    Storage.setItem(ONBOARDING_STORAGE_KEY, 'true')

    navigate('SignIn')
  }

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: colors.background }}>
      <OnboardingComponent
        data={DATA}
        finishButtonText="Get Started"
        onSkip={handleNavigateToSignIn}
        onFinish={handleNavigateToSignIn}
      />
    </ScrollView>
  )
}
