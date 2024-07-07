import { Icon } from '@/components/icon'
import { Text } from '@/components/text'
import { useTheme } from '@/providers'
import { MenuAction, MenuView } from '@react-native-menu/menu'
import { Control, Controller, FieldPath } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

interface OptionSelectProps<T> {
  name: FieldPath<T>
  control: Control<T>
  getValueLabel: (value: string) => string
  options: MenuAction[]
}

export function OptionSelect<T>({
  name,
  control,
  options,
  getValueLabel,
}: OptionSelectProps<T>) {
  const { isDark, colors } = useTheme()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <MenuView
            title="Menu Title"
            onPressAction={({ nativeEvent }) => {
              onChange(nativeEvent.event)
            }}
            actions={options}
            themeVariant={isDark ? 'dark' : 'light'}
            shouldOpenOnLongPress={false}
          >
            <View style={styles.container}>
              <Text>{getValueLabel(value as string)}</Text>
              <Icon name="chevron-down" color={colors.select} />
            </View>
          </MenuView>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
