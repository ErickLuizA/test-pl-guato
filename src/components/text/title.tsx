import { useTheme } from '@/providers'
import { StyleSheet, Text, TextProps } from 'react-native'

interface TitleProps extends TextProps {}

export function Title({ children, ...rest }: TitleProps) {
  const { colors } = useTheme()

  return (
    <Text style={[styles.container, { color: colors.text }]} {...rest}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})
