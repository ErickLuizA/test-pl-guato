import { View } from 'react-native'

interface SpacerProps {
  size?: number
}

export function Spacer({ size = 16 }: SpacerProps) {
  return <View style={{ width: size, height: size }} />
}
