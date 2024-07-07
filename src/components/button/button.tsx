import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'
import { ThemeColors, useTheme } from '@/providers'

interface ButtonProps extends PressableProps {
  text: string
  style?: StyleProp<ViewStyle>
  colorType?: keyof ThemeColors
  backgroundColorType?: keyof ThemeColors
  loading?: boolean
}

export function Button({
  text,
  style,
  loading,
  colorType,
  backgroundColorType,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme()

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: colors?.[backgroundColorType] || colors.background,
          opacity: rest?.disabled && !loading ? 0.5 : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={colors?.[colorType] || colors.text} />
      ) : (
        <Text
          style={[styles.text, { color: colors?.[colorType] || colors.text }]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
