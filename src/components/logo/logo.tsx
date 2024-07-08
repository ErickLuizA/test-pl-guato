import { useTheme } from '@/providers'
import { Dimensions, StyleSheet } from 'react-native'
import DarkLogo from '../../../assets/icons/logo_dark.svg'
import LightLogo from '../../../assets/icons/logo_light.svg'

const { width } = Dimensions.get('window')

const LOGO_SIZE = width / 2 + 10

export function Logo() {
  const { isDark } = useTheme()

  if (isDark) {
    return (
      <LightLogo
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        style={styles.container}
      />
    )
  }

  return (
    <DarkLogo width={LOGO_SIZE} height={LOGO_SIZE} style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: -40,
    marginTop: -8,
  },
})
