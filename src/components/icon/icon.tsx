import { useTheme } from '@/providers'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface IconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap
  color?: string
  size?: number
}

export function Icon({ name, color, size }: IconProps) {
  const { colors } = useTheme()

  return (
    <MaterialCommunityIcons
      name={name}
      color={color || colors.text}
      size={size ?? 24}
    />
  )
}
