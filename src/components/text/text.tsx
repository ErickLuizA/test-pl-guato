import { useTheme } from '@/providers'
import { TextProps as RNTextProps, Text as RNText } from 'react-native'

interface TextProps extends RNTextProps {
  color?: string
  size?: number
  bold?: boolean
}

export function Text({
  children,
  style,
  color,
  size,
  bold,
  ...rest
}: TextProps) {
  const { colors } = useTheme()

  return (
    <RNText
      style={[
        {
          color: color || colors.text,
          fontSize: size || 16,
          fontWeight: bold ? 'bold' : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  )
}
