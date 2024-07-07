import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface IconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap
  color: string
  size?: number
}

export function Icon({ name, color, size }: IconProps) {
  return <MaterialCommunityIcons name={name} color={color} size={size ?? 24} />
}
