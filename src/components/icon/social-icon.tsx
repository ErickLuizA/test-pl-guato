import { SocialProvider } from '@/constants/enums'
import { useTheme } from '@/providers'
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native'
import { SvgProps } from 'react-native-svg'
import AppleIcon from '../../../assets/icons/apple_icon.svg'
import FacebookIcon from '../../../assets/icons/facebook_icon.svg'
import GoogleIcon from '../../../assets/icons/google_icon.svg'

interface SocialIconProps extends PressableProps {
  provider: SocialProvider
  loading?: boolean
}

interface IconProps extends SvgProps {
  isDark: boolean
}

const mapper = {
  [SocialProvider.Apple]: (props: IconProps) => (
    <AppleIcon fill={props.isDark ? '#FFFFFF' : '#000000'} {...props} />
  ),
  [SocialProvider.Google]: (props: IconProps) => <GoogleIcon {...props} />,
  [SocialProvider.Facebook]: (props: IconProps) => <FacebookIcon {...props} />,
}

const SIZE = 28

export function SocialIcon({ provider, loading, ...rest }: SocialIconProps) {
  const { colors, isDark } = useTheme()

  const Component = mapper?.[provider]

  if (!Component) return null

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors.secondary,
          borderColor: colors.placeholder,
          opacity: rest?.disabled ? 0.5 : 1,
        },
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} style={styles.loadingSize} />
      ) : (
        <Component isDark={isDark} height={SIZE} width={SIZE} />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 12,
    alignSelf: 'center',
  },

  loadingSize: {
    width: SIZE,
    height: SIZE,
  },
})
