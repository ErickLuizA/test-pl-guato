import { useTheme } from '@/providers'
import { StyleSheet, View } from 'react-native'

interface IndicatorProps {
  currentStep: number
  numberOfSteps: number
}

export function Indicator({ currentStep, numberOfSteps }: IndicatorProps) {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      {new Array(numberOfSteps).fill(0).map((_, index) => {
        const isCurrent = index === currentStep

        return (
          <View
            key={index}
            style={[
              styles.circle,
              { backgroundColor: colors.primary, opacity: isCurrent ? 1 : 0.2 },
            ]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
})
