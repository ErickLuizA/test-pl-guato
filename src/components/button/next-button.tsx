import { Pressable, PressableProps, StyleSheet } from 'react-native'
import { Icon } from '@/components/icon'
import { useTheme } from '@/providers'

interface NextButtonProps extends PressableProps {}

export function NextButton(props: NextButtonProps) {
  const { colors } = useTheme()

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.primary }]}
      {...props}
    >
      <Icon name="chevron-right" color={colors.onPrimary} size={24} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: 14,
    borderRadius: 99,
  },
})
